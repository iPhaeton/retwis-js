const express = require('express');
const app = express()
const authRoutes = require('./auth/routes');
const {setnx} = require('./redis');
const {PORT} = require('./config');

app.use(authRoutes);

app.listen(PORT, async () => {
    await setnx('nextUserId', 0);
    console.log(`Redis app listening on port ${PORT}!`);
});

app.get('/', 
    (req, res, next) => {
        console.log('!!!1')
        next()
    },
    (req, res, next) => {
        console.log('!!!2')
        next()
    },
    (req, res, next) => {
        console.log('!!!3')
        res.send('ok')
    }
)
