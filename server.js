const express = require('express');
const app = express()
const port = 3000;
const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
const del = promisify(client.del).bind(client);
const incr = promisify(client.incr).bind(client);

app.listen(port, async () => {
    let nextUserId = null
    await set('nextUserId', 0)
    nextUserId = await get('nextUserId');
    console.log(nextUserId);
    nextUserId = await incr('nextUserId');
    console.log(nextUserId);

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

client.set('foo', 'bar')
