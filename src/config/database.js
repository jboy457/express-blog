/* eslint-disable no-console */
const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = {
  connect: async (uri) => {
    // Connecting to the database
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        logger.info('Successfully connected to database');
      })
      .catch((error) => {
        logger.info('database connection failed. exiting now...');
        logger.error(error);
        process.exit(1);
      });
  },

  disconnect: async () => {
    mongoose.connection.close();
  }
};
