const { connect, disconnect } = require('./database');
const logger = require('./logger');

module.exports = {
  connect,
  disconnect,
  logger
};
