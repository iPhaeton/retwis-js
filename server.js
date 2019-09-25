const express = require('express');
const app = express()
const port = 3000;
const authRoutes = require('./auth/routes');
const {setnx} = require('./redis');

app.use(authRoutes);

app.listen(port, async () => {
    await setnx('nextUserId', 0);
    console.log(`Redis app listening on port ${port}!`);
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
