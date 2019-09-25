const express = require('express');
const app = express()
const authRoutes = require('./auth/routes');
const {setnx} = require('./redis');
const {PORT} = require('./config');
const {authGuard} = require('./auth/guards');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(authRoutes);

app.listen(PORT, async () => {
    await setnx('nextUserId', 0);
    console.log(`Redis app listening on port ${PORT}!`);
});

app.get('/', 
    authGuard,
    (req, res, next) => {
        res.json(req.user);
    }
)
