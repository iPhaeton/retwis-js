const {incr} = require('../redis');
const {randomBytes} = require('crypto');

const getNextUserId = async () => {
    const nextUserId = await incr('nextUserId');
    return nextUserId;
};

const getRandomHash = () => {
    const hash = randomBytes(32).toString('hex');
    return hash;
}

const trimUser = (user) => {
    const {password, hash, ...userData} = user;
    return userData;
}

const trimPassword = (user) => {
    const {password, ...userData} = user;
    return userData;
}

module.exports = {
    getNextUserId,
    getRandomHash,
    trimUser,
    trimPassword,
}