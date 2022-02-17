/* eslint-disable no-constant-condition */
const fs = require('fs');
const path = require('path');
const { logger } = require('../config');

class Upload {
  static async toServer(file, folder, previousFile) {
    try {
      const ext = file.mimetype.split('/').pop();
      if ((ext !== 'jpg') && (ext !== 'jpeg') && (ext !== 'png')) {
        return false;
      }

      const fileName = `${folder}/${Date.now()}-${file.name}`;

      // eslint-disable-next-line consistent-return
      file.mv(path.join('./uploads', fileName), (err) => {
        if (err) {
          return false;
        }
      });
      if (previousFile != null) {
        fs.unlinkSync(`./uploads${previousFile}`);
      }
      return fileName;
    } catch (err) {
      logger.info(err);
      return false;
    }
  }
}

module.exports = { Upload };
