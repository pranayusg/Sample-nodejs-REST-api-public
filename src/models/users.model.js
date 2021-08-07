/*****************************************************************************************************************
@Author:pranayusg
@Description: All database interactions are done in this file
*****************************************************************************************************************/
var Sequelize = require('sequelize');
const sequelize=require('./connection')

var methods = {};

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
    sequelize.query('select password from biqaepposeconcu0el3n.users where mail=?',
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
    sequelize.query("SELECT count(*) as count from biqaepposeconcu0el3n.users" , { type: sequelize.QueryTypes.SELECT }).then(function (users) {
        return users[0].count;
    })
);
};

methods.deleteUsers = function () {
  return (
    sequelize.query("delete from biqaepposeconcu0el3n.users where id>1" )
);
};

methods.getId = function (userMail) {
  return (
    sequelize.query('select id from biqaepposeconcu0el3n.users where mail=?',
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