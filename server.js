const express = require('express');
const app = express()
const authRoutes = require('./auth/routes');
const postsRoutes = require('./posts/routes');
const {setnx} = require('./redis');
const {PORT} = require('./config');
const {authGuard} = require('./auth/guards');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(postsRoutes);

app.listen(PORT, async () => {
    await setnx('nextUserId', 0);
    await setnx('nextPostId', 0);
    console.log(`Redis app listening on port ${PORT}!`);
});
