// mongodb文件存储设置
const mime = require('mime-types');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const log = require('./log');

const { DB_URL } = require('./config');

let gridFs;

module.exports.connect = () => {
  return new Promise((resolve) => {
    log('waitting connect....')
    log(DB_URL);
    const conn = mongoose.createConnection(DB_URL);
    conn.once('open', function () {
      gridFs = Grid(conn.db, mongoose.mongo);
      log('=========== gridfs-stream init done ========')
      resolve();
    })
  })
}

/**
 * 上传文件到mongodb
 * @param file Readstream
 * @param filename
 * @param id
 * @returns {Promise<unknown>}
 */
module.exports.upload = ({ file, filename, id }) => {
  return new Promise((resolve, reject) => {
    const contentType = mime.lookup(filename);
    const options = {
      content_type: contentType,
      filename: filename
    }
    if (id)
      options._id = id;

    const writeStream = gridFs.createWriteStream(options)
    writeStream.on('close', (file) => {
      const info = JSON.stringify(file);
      log(info);
      resolve(file)
    })
    writeStream.on('error', (err) => {
      log(err)
      resolve();
    })
    file.pipe(writeStream)
  })
}
