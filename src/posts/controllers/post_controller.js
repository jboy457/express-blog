const { logger } = require('../../config');
const { Response } = require('../../utils');
const { PostService } = require('../services');

module.exports = Object.freeze({
  createPost: async (req, res) => {
    try {
      const { status, message, data } = await PostService.create(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.success(res, status, message, data);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  },
  getPost: async (req, res) => {
    try {
      const { status, message, data } = await PostService.findPost(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.success(res, status, message, data);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  },
  getAllPost: async (req, res) => {
    try {
      const { status, message, data } = await PostService.findAllPost(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.success(res, status, message, data);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  },
  updateUserPost: async (req, res) => {
    try {
      const { status, message, data } = await PostService.updatePost(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.success(res, status, message, data);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  },
  deleteUserPost: async (req, res) => {
    try {
      const { status, message, data } = await PostService.deletePost(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.success(res, status, message, data);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  }
});
