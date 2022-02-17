/* eslint-disable no-console */
const app = require('./src/app');

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Bot listenenig on port ${PORT}`);
  });
};

startServer();
