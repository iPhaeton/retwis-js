const {hget, hgetall} = require('../redis');
const {trimPassword} = require('./utils');

const authGuard = async (req, res, next) => {
    const {auth} = req.cookies;
    const userId = await hget('auth', auth);
    const user = await hgetall(`user:${userId}`);

    if (!user) {
        res
        .status(401)
        .json({
            error: 'Unauthorized',
        })
    }

    req.user = {
        id: userId,
        ...trimPassword(user)
    };
    next();
}

module.exports = {
    authGuard,
}