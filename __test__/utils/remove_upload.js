const fs = require('fs');
const path = require('path');

module.exports = {
  deleteUpload: async (file) => {
    // Delete test file
    const directory = `${__dirname}/../../uploads`;
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  }
};
