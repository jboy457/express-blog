const redis = require('redis');
const logger = require('./logger');

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  logger.info('Successfully connected to redis!!');
});

redisClient.on('error', (error) => {
  logger.error(error);
});

module.exports = redisClient;
