const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const PostByIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.objectId()
      .required()
      .label('id')
  })
}).options({ allowUnknown: true });

module.exports = { PostByIdSchema };
