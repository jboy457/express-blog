const Joi = require('joi');

const AuthenicateSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(15)
      .required()
  })
}).options({ allowUnknown: true });

module.exports = { AuthenicateSchema };
