const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
const del = promisify(client.del).bind(client);
const incr = promisify(client.incr).bind(client);
const setnx = promisify(client.setnx).bind(client);
const hget = promisify(client.hget).bind(client);
const hset = promisify(client.hset).bind(client);
const hdel = promisify(client.hdel).bind(client);
const hmset = promisify(client.hmset).bind(client);
const hgetall = promisify(client.hgetall).bind(client);
const zrange = promisify(client.zrange).bind(client);
const lpush = promisify(client.lpush).bind(client);
const ltrim = promisify(client.ltrim).bind(client);

const createHash = async (name, data) => {
    const params = Object.entries(data).reduce((res, [key, value]) => [
        ...res,
        key,
        value,
    ], [name]);

    await hmset(params);
    const result = await hgetall(name);
    return result;
};

module.exports = {
    set,
    get,
    del,
    incr,
    setnx,
    hget,
    hset,
    hdel,
    hmset,
    hgetall,
    createHash,
    zrange,
    lpush,
    ltrim,
}