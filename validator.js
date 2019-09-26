const validator = (schema) => {
    return (req, res, next) => {
        const {body} = req;
        const {error, value} = schema.validate(body);

        if (error) {
            res
            .status(500)
            .json({
                error: `Validation error: ${error.message}`,
            });
        } else {
            next();
        }
    }
}

module.exports = validator;