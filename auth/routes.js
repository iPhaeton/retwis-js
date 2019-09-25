const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {getNextUserId} = require('./utils');

router.use(bodyParser.json());

router.post('/signup', async (req, res, next) => {
    const nextUserId = await getNextUserId();
    console.log('signup', req.body, nextUserId);
    res.send(`ok ${nextUserId}`);
});

module.exports = router;