const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
const del = promisify(client.del).bind(client);
const incr = promisify(client.incr).bind(client);
const setnx = promisify(client.setnx).bind(client);

module.exports = {
    set,
    get,
    del,
    incr,
    setnx,
}