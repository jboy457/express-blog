const apis = require('express').Router();

const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const UserMicroService = require('../users');
const PostMicroService = require('../posts');
const { isLoggedIn } = require('./middlewares');
const { Response } = require('../utils');

// API Documentation
const docs = yaml.load(`${__dirname}/docs/swagger.yaml`);
apis.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
apis.use('/users', UserMicroService.router);
apis.use('/posts', isLoggedIn, PostMicroService.router);

apis.use('*', (req, res) => Response.error(res, 404, 'Not Found'));

module.exports = { apis };
