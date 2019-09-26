const express = require('express');
const router = express.Router();
const {authGuard} = require('../auth/guards');
const {hmset, incr, hgetall, zrange, lpush, ltrim} = require('../redis');

router.use(authGuard);

router.post('/post', async (req, res, next) => {
    const {id} = req.user;
    const {message} = req.body;
    const postId = await incr('nextPostId');
    const now = new Date();
    await hmset(`post:${postId}`, 'userId', id, 'time', now.getTime(), 'body', message);
    const post = await hgetall(`post:${postId}`);

    const followers = await zrange(`followers:${id}`, 0, -1);
    followers.push(id);

    await Promise.all(
        followers.map(fid => lpush(`posts:${fid}`, postId)),
    );

    await lpush('timeline', postId);
    await ltrim('timeline', 0, 1000);

    res.json({
        id: postId,
        ...post,
    });
})

module.exports = router;