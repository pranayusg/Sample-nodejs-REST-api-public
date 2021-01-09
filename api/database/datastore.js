/*****************************************************************************************************************
@Author:pranayusg
@Description: All database interactions are done in this file
*****************************************************************************************************************/
var Sequelize = require('sequelize');
var fs = require('fs');

var config = readConfig();
var methods = {};

function readConfig() 
{
    return JSON.parse(fs.readFileSync('api/database/config.json'));
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
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  userDataModel = sequelize.define('users', {
    mail: { type: Sequelize.STRING(45) },
    password: Sequelize.STRING(200),
    id: { type: Sequelize.INTEGER, primaryKey: true }
}, { timestamps: false, charset: 'utf-8' });


methods.checkMail = function (userMail) {
  return (
    userDataModel
        .findOne({
            where: {
              mail: userMail
            }
        })
        .then(function (result) {
            if (result)
                return true;
            else
                return false;
        })
);
};

methods.getPassword = function (userMail) {
  return (
    sequelize.query('select password from b7cvc44ekzdy7nduprff.users where mail=?',
    {
      replacements: [userMail],
      type: Sequelize.QueryTypes.SELECT
    })
    .then(function (result) {
          return result[0].password;
  })
);
};

methods.saveUser = function (property) {
    return (userDataModel.upsert({
        mail: property.mail, password: property.password
    })
    );
};

methods.getCount = function () {
  return (
    sequelize.query("SELECT count(*) as count from b7cvc44ekzdy7nduprff.users" , { type: sequelize.QueryTypes.SELECT }).then(function (users) {
        return users[0].count;
    })
);
};

methods.deleteUsers = function () {
  return (
    sequelize.query("Delete from b7cvc44ekzdy7nduprff.users where id>1" )
);
};

methods.getId = function (userMail) {
  return (
    sequelize.query('select id from b7cvc44ekzdy7nduprff.users where mail=?',
    {
      replacements: [userMail],
      type: Sequelize.QueryTypes.SELECT
    })
    .then(function (result) {
          return result[0].id;
  })
);
};

module.exports = methods;