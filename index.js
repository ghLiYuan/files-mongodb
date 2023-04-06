const fs = require('fs');
const { upload, connect } = require('./fileService');
const log = require('./log');

const { DIR_FILES } = require('./config');

function beginUpload() {
  return new Promise((resolve) => {
    fs.readdir(DIR_FILES, async (err, files) => {
      if (err) {
        log(err);
        process.exit(1);
      }
      for (const file of files) {
        const filePath = `${DIR_FILES}/${file}`;
        await upload({
          file: fs.createReadStream(filePath),
          filename: file,
          id: file
        })
      }
      resolve()
    })
  })
}

connect()
  .then(beginUpload)
  .then(() => {
    log('done')
    // process.exit()
  })
