/* eslint-disable no-underscore-dangle */
const { redisClient } = require('../../config');
const { UserRepository } = require('../../users/repositories');
const { Response, JWT } = require('../../utils');

module.exports = Object.freeze({
  isLoggedIn: async (req, res, next) => {
    try {
      if (!req.header('x-auth-token')) return Response.error(res, 401, 'Unauthorized user. Log in and try again');
      const decoded = await JWT.verify(req.header('x-auth-token'));
      if (!decoded._id) return Response.error(res, 401, 'Session Expired');

      let user;
      const cacheUser = await redisClient.get(decoded._id);
      user = JSON.parse(cacheUser);
      if (!user) {
        user = await UserRepository.findByEmail(decoded.email);
        redisClient.set(user._id, JSON.stringify(user));
      }

      if (!user) return Response.error(res, 401, 'Unauthorized user. Log in and try again');
      req.user = user;
      req.token = req.header('x-auth-token');
      return next();
    } catch (err) {
      return Response.error(res, 500, err.message);
    }
  }
});
