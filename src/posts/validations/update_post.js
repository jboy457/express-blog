const Joi = require('joi');

const UpdatePostSchema = Joi.object({
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
  }).messages({ 'object.base': '{#label} is required' }).label('image'),
  params: Joi.object({
    id: Joi.objectId()
      .required()
      .label('id')
  })
}).options({ allowUnknown: true });

module.exports = { UpdatePostSchema };
