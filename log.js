const log4js = require('log4js');
const { LOG_FILENAME } = require('./config');

log4js.configure({
  appenders: {
    everything: { type: "file", filename: LOG_FILENAME },
  },
  categories: {
    default: { appenders: ["everything"], level: "debug" },
  },
});

module.exports = (info) => {
  console.log(info);
  const logger = log4js.getLogger();
  logger.info(info);
}
