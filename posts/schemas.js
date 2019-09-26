const Joi = require('@hapi/joi');

const post = Joi.object({
    message: Joi
        .string()
        .required()
});

module.exports = {
    post,
}