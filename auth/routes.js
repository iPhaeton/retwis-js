const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());``

router.post('/signup', (req, res, next) => {
    console.log('signup', req.body);
    res.send('ok');
});

module.exports = router;