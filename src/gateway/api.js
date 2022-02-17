const apis = require('express').Router();
const UserMicroService = require('../users');

apis.use('/user', UserMicroService.router);

module.exports = { apis };
