const { logger } = require('../../config');
const { Response } = require('../../utils');
const { UserService } = require('../services');

module.exports = Object.freeze({
  register: async (req, res) => {
    try {
      const { status, message, data } = await UserService.create(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.success(res, status, message, data);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  },
  authenticate: async (req, res) => {
    try {
      const { status, message, data } = await UserService.authenticate(req);
      if (status >= 400) return Response.error(res, status, message);
      return Response.session(res, status, message, data.token, data.user);
    } catch (err) {
      logger.error(err);
      return Response.server(res);
    }
  }
});
