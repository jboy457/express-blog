/* eslint-disable no-console */
const app = require('./src/app');
const { connect, logger } = require('./src/config');
const { redisClient } = require('./src/config');

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  await connect(process.env.MONGODB_URI);
  await redisClient.connect();
  app.listen(PORT, (err) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(`Bot listenenig on port ${PORT}`);
  });
};

startServer();
