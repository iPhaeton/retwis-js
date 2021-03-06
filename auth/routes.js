const express = require('express');
const router = express.Router();
const {getNextUserId, getRandomHash, trimUser} = require('./utils');
const {hget, hdel, createHash, hset, hgetall} = require('../redis');
const {authGuard} = require('./guards');

router.post('/signup', async (req, res, next) => {
    const {username, password} = req.body;
    const existingUser = await hget('users', username)
    
    if (existingUser !== null) {
        res
        .status(409)
        .json({
            error: 'User already exists'
        });
    }

    const userId = await getNextUserId();
    const hash = getRandomHash();
    await hset('users', username, userId)
    const user = await createHash(`user:${userId}`, {
        username,
        password,
        hash,
    });
    
    res.json(trimUser(user));
});

router.post('/signin', async (req, res, next) => {
    const {username, password} = req.body;
    const userId = await hget('users', username);
    const user = await hgetall(`user:${userId}`);

    if (!user || user.username != username || user.password !== password) {
        res
        .status(401)
        .json({
            error: "Wrong username or password"
        });
    }

    await hset('auth', user.hash, userId);

    res
    .set('Set-Cookie', `auth=${user.hash}`)
    .json(trimUser(user));
});

router.post(
    '/logout',
    authGuard,
    async (req, res, next) => {
        const {id, hash} = req.user;
        const newHash = getRandomHash()
        await hset(`user:${id}`, 'hash', newHash);
        await hdel('auth', hash);
        res.json({success: true});
    },
)

module.exports = router;