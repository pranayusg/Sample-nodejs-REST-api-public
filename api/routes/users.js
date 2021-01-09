const express = require('express')
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const moment = require('moment')
var nodemailer = require('nodemailer');

const datastore = require('../database/datastore')
const bcrypt = require('bcrypt');

var saltRounds = 10;

var config = readConfig();
const checkAuth = require('../middleware/checkAuth')

function readConfig() {
    return JSON.parse(fs.readFileSync('api/database/config.json'));
}

router.post('/signup', (req, res) => {
    try {
        if (req.body.mail.includes('@') && req.body.password.length>1) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
                    console.error(err)
                }
                else {
                    // Store hash in your password DB.
                    var property = {
                        mail: req.body.mail,
                        password: hash
                    }

                    datastore.checkMail(property.mail)
                        .then(function (exists) {
                            if (exists) {
                                res.status(404).json({
                                    message: 'This mail already exists'
                                })
                            }
                            else {
                                datastore.getCount()
                                    .then(function (count) {
                                        if (count > 20) {
                                            datastore.deleteUsers()
                                        }
                                        datastore.saveUser(property)
                                            .then(function () {
                                                res.status(200).json({
                                                    message: 'User saved'
                                                })
                                            }
                                            )
                                    })
                            }
                        });
                }
            })
        }
        else {
            res.status(422).json({
                message: 'Invalid mail'
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message: 'Invalid request body'
        })
    }
})

router.post('/signin', (req, res) => {
    try {
        datastore.checkMail(req.body.mail)
            .then(function (exists) {
                if (exists) {
                    datastore.getPassword(req.body.mail)
                        .then(function (encryptedPassword) {
                            bcrypt.compare(req.body.password, encryptedPassword, function (err, result) {
                                if (err) {
                                    console.error(err)
                                }
                                else {
                                    if (result == true) {
                                        datastore.getId(req.body.mail)
                                            .then(function (id) {
                                                payload = { mail: req.body.mail, id: id }
                                                options ={ expiresIn: '1h' ,issuer:'pranayusg',audience:'RestNodeAPI'}
                                                token = jwt.sign(payload, config.privateKey,options );

                                                var transporter = nodemailer.createTransport({
                                                    service: 'gmail',
                                                    auth: {
                                                      user: config.mailUsername,
                                                      pass: config.mailPassword
                                                    }
                                                  });
                                                  
                                                  var mailOptions = {
                                                    from: config.mailUsername,
                                                    to: 'pranayu6@gmail.com',
                                                    subject: 'Alert your API was accessed',
                                                    text: req.body.mail+' has signed in your API'
                                                  };
                                                  
                                                  transporter.sendMail(mailOptions, function(error, info){
                                                    if (error) {
                                                      console.log('There is a error');
                                                    } else {
                                                      console.log('Email sent');
                                                    }
                                                  });

                                                res.status(200).json({
                                                    token: token,
                                                    message: 'Auth successfull.Please copy the token and paste in the above authorise field to use authorised routes'
                                                })
                                            })
                                    }
                                    else {
                                        res.status(404).json({
                                            message: 'wrong password'
                                        })
                                    }
                                }
                            });

                        })
                }
                else {
                    res.status(422).json({
                        message: "Mail doesn't exist.Please use the signup route to create user first"
                    })
                }
            });
    }
    catch (error) {
        res.status(400).json({
            message: 'Invalid request body'
        })
    }
})

router.get('/decodetoken', checkAuth, (req, res) => {
    req.userData.tokenDuration='1 hour'
    req.userData.issuedAt=moment.unix(req.userData.iat).format("DD-MM-YYYY H:mm:ss");
    req.userData.expiresAT=moment.unix(req.userData.exp).format("DD-MM-YYYY H:mm:ss");
    req.userData.decodedInfo = {
        description:'JSON Web Token is a standard used to create access tokens for an application.It works this way: the server generates a token that certifies the user identity, and sends it to the client.The client will send the token back to the server for every subsequent request, so the server knows the request comes from a particular identity.This architecture proves to be very effective in modern Web Apps, where after the user is authenticated API requests are performed.',
        issuer:'The issuer of the token',
        audience:'To know what or who the token is intended for.Suppose I regularly use JWTs from AUTH SERVER to sign in to several several websites, including A and B. Without the aud claim, the JWTs would be identical. This would allow a malicious admin from A to use my JWT to authenticate to B.'
    }
    res.status(200).json(
        req.userData
    )
})

module.exports = router;