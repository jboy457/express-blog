/* eslint-disable no-console */
const mongoose = require('mongoose');

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI;

module.exports = {
  connect: () => {
    // Connecting to the database
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Successfully connected to database');
      })
      .catch((error) => {
        console.log('database connection failed. exiting now...');
        console.error(error);
        process.exit(1);
      });
  },

  disconnect: async () => {
    mongoose.connection.close();
  }
};
