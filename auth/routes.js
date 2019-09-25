const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {getNextUserId, getRandomHash, trimUser} = require('./utils');
const {hget, createHash} = require('../redis');

router.use(bodyParser.json());

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

    const nextUserId = await getNextUserId();
    const hash = getRandomHash();
    const user = await createHash(`user:${nextUserId}`, {
        username,
        password,
        hash,
    });
    
    res.json(trimUser(user));
});

module.exports = router;