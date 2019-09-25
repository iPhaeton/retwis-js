const {incr} = require('../redis');

const getNextUserId = async () => {
    const nextUserId = await incr('nextUserId');
    return nextUserId;
};

module.exports = {
    getNextUserId,
}