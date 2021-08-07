const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment')
const usersModel = require('../models/users.model')
const mailService=require('../services/mail.service');
const { validationResult } = require('express-validator');

const saltRounds = 10;
const signUpValidationResult  = validationResult.withDefaults({
    formatter: error => {
      return {
        msg:error.msg,
        param:error.param,
        location: error.location
      };
    },
  });

const signup = (req, res) => {
    const errors = signUpValidationResult(req).array();

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err)
        }
        else {
            // Store hash in your password DB.
            let property = {
                mail: req.body.mail,
                password: hash
            }

            usersModel.checkMail(property.mail)
                .then((exists) => {
                    if (exists) {
                        res.status(404).json({
                            message: 'This mail already exists'
                        })
                    }
                    else {
                        usersModel.getCount()
                            .then((count) => {
                                if (count > 20) {
                                    usersModel.deleteUsers()
                                }
                                usersModel.saveUser(property)
                                    .then(() => {
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
    

const signin =  (req, res) => {   
        usersModel.checkMail(req.body.mail)
            .then((exists) => {
                if (exists) {
                    usersModel.getPassword(req.body.mail)
                        .then((encryptedPassword)=> {
                           
                            bcrypt.compare(req.body.password, encryptedPassword,(err, result)=> {
                                if (err) {
                                    console.error(err)
                                }
                                else {
                                    if (result == true) {
                                        usersModel.getId(req.body.mail)
                                            .then((id)=> {
                                                payload = { mail: req.body.mail, id: id }
                                                options ={ expiresIn: '1h' ,issuer:'pranayusg',audience:'RestNodeAPI'}
                                                token = jwt.sign(payload, process.env.PRIVATE_KEY,options );

                                                mailService.sentMail(req.body.mail+' has signed in');

                                                res.status(200).json({
                                                    token: token,
                                                    message: 'Auth successfull.Please copy the token and paste in the above authorise field to use authorised routes'
                                                })
                                            })
                                    }
                                    else {
                                        res.status(404).json({
                                            message: 'Wrong password'
                                        })
                                    }
                                }
                            });

                        })
                }
                else {
                    res.status(422).json({
                        message: "Mail doesn't exist.Please use the signup route to create user first or enter correct mail"
                    })
                }
            });
    }

const decodetoken =  (req, res) => {  
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
}


module.exports={signup,signin,decodetoken}