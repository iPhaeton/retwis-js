const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    console.log('signup');
    res.send('ok');
});

module.exports = router;