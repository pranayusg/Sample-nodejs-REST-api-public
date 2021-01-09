const express = require('express')
const router = express.Router();
var request = require('request-promise');
const fs = require('fs');
var nodemailer = require('nodemailer');

const checkAuth = require('../middleware/checkAuth')
var config = readConfig();

function readConfig() {
    return JSON.parse(fs.readFileSync('api/database/config.json'));
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailUsername,
      pass: config.mailPassword
    }
  });

router.get('/country/name/:name',checkAuth,  async (req, res) => {
    var country = req.params.name;
    country = country.charAt(0).toUpperCase() + country.slice(1)
    var index;
    var options = {
        json: true,
        method: 'GET',
        url: config.covidUrl
    };

    request(options)
        .then(function (data) {

            for (i = 0; i < data.length; i++) {
                if (data[i].country == country) {
                    index = i;
                    break;
                }
            }

            var mailOptions = {
                from: config.mailUsername,
                to: 'pranayu6@gmail.com',
                subject: 'Alert your API was accessed',
                text: req.userData.mail+' has accessed covid route with path parameters for country '+country
              };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log('There is a error');
                } else {
                  console.log('Email sent');
                }
              });

            res.status(200).json({
                "infected": data[index].infected,
                "tested": data[index].tested,
                "recovered": data[index].recovered,
                "deceased": data[index].deceased,
                "country": data[index].country,
                "lastUpdated": data[index].lastUpdatedApify
            })
        })
        .catch(function (error) {
            res.status(404).json({
                message: 'Sorry,we currently dont have data for this country'
            })
        })
})

router.get('/country/name', checkAuth, async (req, res) => {
    var country = req.query.country;
    country = country.charAt(0).toUpperCase() + country.slice(1)
    var index;
    var options = {
        json: true,
        method: 'GET',
        url: config.covidUrl
    };

    request(options)
        .then(function (data) {

            for (i = 0; i < data.length; i++) {
                if (data[i].country == country) {
                    index = i;
                    break;
                }
            }

            var mailOptions = {
                from: config.mailUsername,
                to: 'pranayu6@gmail.com',
                subject: 'Alert your API was accessed',
                text: req.userData.mail+' has accessed covid route with query parameters for country '+country
              };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log('There is a error');
                } else {
                  console.log('Email sent');
                }
              });

            res.status(200).json({
                "infected": data[index].infected,
                "tested": data[index].tested,
                "recovered": data[index].recovered,
                "deceased": data[index].deceased,
                "country": data[index].country,
                "lastUpdated": data[index].lastUpdatedApify
            })
        })
        .catch(function (error) {
            res.status(404).json({
                message: 'Sorry,we currently dont have data for this country'
            })
        })
})
module.exports = router;