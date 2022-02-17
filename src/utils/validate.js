const Joi = require('joi');
const { logger } = require('../config');
const { Response } = require('./response');

function Validate(schema, hasFile) {
  return async (req, res, next) => {
    if (!Joi.isSchema(schema)) {
      logger.error('Invalid joi schema');
    }
    try {
      if (hasFile !== undefined) {
        await schema.validateAsync({ body: req.body, files: req.files });
      } else {
        await schema.validateAsync({ body: req.body });
      }
    } catch (e) {
      const validationErrors = e.details.map((errorDetail) => ({
        key: errorDetail.context.key,
        message: errorDetail.message
      }));
      return Response.error(res, 422, 'Validation Error', validationErrors);
    }
    return next();
  };
}

module.exports = { Validate };
