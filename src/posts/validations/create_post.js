const Joi = require('joi');

const CreatePostSchema = Joi.object({
  body: Joi.object({
    title: Joi.string()
      .required()
      .label('title'),
    description: Joi.string().required()
      .label('description')
  }),
  files: Joi.object({
    image: Joi.object()
      .required()
      .messages({ 'object.base': '{#label} accept a single file' })
      .label('image')
  }).messages({ 'object.base': '{#label} is required' }).label('image')
}).options({ allowUnknown: true });

module.exports = { CreatePostSchema };
