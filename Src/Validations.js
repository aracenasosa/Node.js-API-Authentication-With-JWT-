const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {

    const schema = {
        Username: Joi.string().min(6).required(),
        Email: Joi.string().min(6).required().email(),
        Password: Joi.string().min(6).required(),
        //Password2: Joi.string().min(6).required().exist(Password)
    };
    return Joi.validate(data, schema); 
};

const loginValidation = (data) => {

    const schema = {
        Email: Joi.string().min(6).required().email(),
        Password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema); 
};

module.exports = {
    registerValidation,
    loginValidation
};
