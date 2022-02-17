const apis = require('express').Router();
const UserMicroService = require('../users');
const PostMicroService = require('../posts');
const { isLoggedIn } = require('./middlewares');

apis.use('/user', UserMicroService.router);
apis.use('/post', isLoggedIn, PostMicroService.router);

module.exports = { apis };
