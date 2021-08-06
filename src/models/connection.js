var Sequelize = require('sequelize');
const fs = require('fs');
const logger = require('../lib/logger');

var config = readConfig();

function readConfig() 
{
    return JSON.parse(fs.readFileSync('src/Models/config.json'));
}

sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port:config.port,
    logging: false,
    pool: { maxConnections: 5, maxIdleTime: 30 }
});


sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.')
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    logger.info('Unable to connect to the database:', err)
    console.error('Unable to connect to the database:', err);
  });

 module.exports=sequelize; 