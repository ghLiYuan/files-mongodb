const path = require('path');
module.exports = {
  // mongodb
  DB_URL: 'mongodb://172.30.240.90:27016/portal',
  // 待上传文件目录
  DIR_FILES: path.resolve(__dirname, '../files'),
  // 日志路径
  LOG_FILENAME: 'all-the-logs.log',
}
