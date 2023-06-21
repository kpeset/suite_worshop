const validator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        (error) ? res.status(400).json(error) : next();
    }
};

module.exports = validator;