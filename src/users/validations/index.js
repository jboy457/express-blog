const { CreateUserSchema } = require('./create_user');
const { AuthenicateSchema } = require('./authenticate_user');

module.exports = Object.freeze({
  CreateUserSchema,
  AuthenicateSchema
});
