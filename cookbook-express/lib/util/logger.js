const Logger = require('log4js'),
  conf = require('config');

Logger.configure(conf.get('logs'));

module.exports = Logger;
