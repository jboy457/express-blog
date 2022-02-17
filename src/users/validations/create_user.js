const Joi = require('joi');

const CreateUserSchema = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .required()
      .label('name'),
    email: Joi.string()
      .email().required()
      .label('email'),
    password: Joi.string()
      .min(3).max(15)
      .required()
      .label('password')
  }),
  files: Joi.object({
    image: Joi.object()
      .required()
      .messages({ 'object.base': '{#label} accept a single file' })
      .label('image')
  }).messages({ 'object.base': '{#label} is required' }).label('image')
});

module.exports = { CreateUserSchema };
