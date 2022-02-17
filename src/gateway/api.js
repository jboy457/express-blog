const apis = require('express').Router();

const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const UserMicroService = require('../users');
const PostMicroService = require('../posts');
const { isLoggedIn } = require('./middlewares');

// API Documentation
const docs = yaml.load(`${__dirname}/docs/swagger.yaml`);
apis.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
apis.use('/user', UserMicroService.router);
apis.use('/post', isLoggedIn, PostMicroService.router);

module.exports = { apis };
