const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { validationResult } = require('express-validator');
const usersModel = require('../models/users.model');
const mailService = require('../services/mail.service');
const logger = require('../lib/logger');

const saltRounds = 10;
const signUpValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    msg: error.msg,
    param: error.param,
    location: error.location,
  }),
});

const signup = (req, res) => {
  const errors = signUpValidationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      logger.error(err);
    } else {
      // Store hash in your password DB.
      const property = {
        mail: req.body.mail,
        password: hash,
      };

      usersModel.checkMail(property.mail).then((exists) => {
        if (exists) {
          res.status(404).json({
            message: 'This mail already exists',
          });
        } else {
          usersModel.getCount().then((count) => {
            if (count > 20) {
              usersModel.deleteUsers();
            }
            usersModel.saveUser(property).then(() => {
              res.status(200).json({
                message: 'User saved',
              });
            });
          });
        }
      });
    }
  });
};

const signin = (req, res) => {
  usersModel.checkMail(req.body.mail).then((exists) => {
    if (exists) {
      usersModel.getPassword(req.body.mail).then((encryptedPassword) => {
        bcrypt.compare(req.body.password, encryptedPassword, (err, result) => {
          if (err) {
            logger.error(err);
          } else if (result === true) {
            usersModel.getId(req.body.mail).then((id) => {
              const payload = { mail: req.body.mail, id };
              const options = {
                expiresIn: process.env.TOKEN_EXPIRATION,
                issuer: process.env.TOKEN_ISSUER,
                audience: process.env.TOKEN_AUDIENCE,
              };
              const token = jwt.sign(payload, process.env.PRIVATE_KEY, options);

              mailService.sentMail(`${req.body.mail} has signed in`);

              res.status(200).json({
                token,
                message:
                  'Auth successfull.Please copy the token and paste in the above authorise field to use authorised routes',
              });
            });
          } else {
            res.status(404).json({
              message: 'Wrong password',
            });
          }
        });
      });
    } else {
      res.status(422).json({
        message:
          "Mail doesn't exist.Please use the signup route to create user first or enter correct mail",
      });
    }
  });
};

const decodetoken = (req, res) => {
  res.locals.userData.tokenDuration = '1 hour';
  res.locals.userData.issuedAt = moment
    .unix(res.locals.userData.iat)
    .format('DD-MM-YYYY H:mm:ss');
  res.locals.userData.expiresAT = moment
    .unix(res.locals.userData.exp)
    .format('DD-MM-YYYY H:mm:ss');
  res.locals.userData.decodedInfo = {
    description:
      'JSON Web Token is a standard used to create access tokens for an application.It works this way: the server generates a token that certifies the user identity, and sends it to the client.The client will send the token back to the server for every subsequent request, so the server knows the request comes from a particular identity.This architecture proves to be very effective in modern Web Apps, where after the user is authenticated API requests are performed.',
    issuer: 'The issuer of the token',
    audience:
      'To know what or who the token is intended for.Suppose I regularly use JWTs from AUTH SERVER to sign in to several several websites, including A and B. Without the aud claim, the JWTs would be identical. This would allow a malicious admin from A to use my JWT to authenticate to B.',
  };
  res.status(200).json(res.locals.userData);
};

module.exports = { signup, signin, decodetoken };
