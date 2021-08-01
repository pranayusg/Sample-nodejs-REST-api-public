const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize, errors } = format;

// In JSON logging colorize doesn't work
module.exports = createLogger({
    // level: 'debug',
    format: combine(
      // colorize(),
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: 'sample nodejs rest api' },
    transports: [
      new transports.Console(),
      new transports.File({ level:'info', filename: 'api/logs/prod/server.log' }),
      new transports.File({ level:'error', filename: 'api/logs/prod/error.log' }),
      new transports.File({ level:'debug', filename: 'api/logs/prod/debug.log' }),
    ],
  });


