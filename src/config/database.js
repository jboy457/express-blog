/* eslint-disable no-console */
const mongoose = require('mongoose');

module.exports = {
  connect: async (uri) => {
    // Connecting to the database
    mongoose
      .connect(uri, {
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
