const router = require('express').Router();

const { Validate } = require('../utils');
const { register, authenticate } = require('./controllers');
const { CreateUserSchema, AuthenicateSchema } = require('./validations');

router.post('/register', Validate(CreateUserSchema), register);
router.post('/login', Validate(AuthenicateSchema), authenticate);

module.exports = { router };
