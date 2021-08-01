const express = require('express')
const router = express.Router();
var axios = require('axios');
var fs = require('fs');

const checkAuth = require('../middleware/checkAuth')

var config = readConfig();

function readConfig() 
{
    return JSON.parse(fs.readFileSync('api/model/config.json'));
}

router.get('/country/name/:name', checkAuth,async (req, res) => {
    var country = req.params.name;
    var options = {
        headers: {
            "x-rapidapi-key": config.covidApiKey,
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "useQueryString": true
        },
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country?name=' + country + '&format=json'
    };
    try {
        var data = await axios(options)
        if(data.data.length>0){
            res.status(200).json(data.data[0])
        }
        else{
        res.status(404).json({
            message: 'Country name not valid'
        })
    }
    } catch (e) {
        res.status(422).json({
            status: 503,
            message: 'Server Error'
        })
    }
})

router.get('/country/code/:name',checkAuth, async (req, res) => {
    var code = req.params.name;
    var options = {
        headers: {
            "x-rapidapi-key": config.covidApiKey,
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "useQueryString": true
        },
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country/code?code=' + code + '&format=json'
    };
    try {
        var data = await axios(options)
        if(data.data.length>0){
            res.status(200).json(data.data[0])
        }
        else{
        res.status(404).json({
            message: 'Country code not valid'
        })
    }
    } catch (e) {
        res.status(422).json({
            status: 503,
            message: 'Server Error'
        })
    }
})

router.get('/country/search', checkAuth,async (req, res) => {
    var country = req.query.searchText
    var url;
    if (country.length <= 3 && country.length >= 2) {
        url = 'https://covid-19-data.p.rapidapi.com/country/code?code=' + country + '&format=json'
    } else {
        url = 'https://covid-19-data.p.rapidapi.com/country?name=' + country + '&format=json'
    }
    
    var options = {
        method: 'GET',
        url: url,
        headers: {
            "x-rapidapi-key": config.covidApiKey,
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "useQueryString": true
        }
    };
    try {
        var data = await axios(options)
        if(data.data.length>0){
            res.status(200).json({
                "country": data.data[0].country,
                "code": data.data[0].code,
                "confirmed": data.data[0].confirmed,
                "recovered": data.data[0].recovered,
                "critical": data.data[0].critical,
                "deaths": data.data[0].deaths,
                "latitude": data.data[0].latitude,
                "longitude": data.data[0].longitude,
                "lastChange": data.data[0].lastChange,
                "lastUpdate": data.data[0].lastUpdates
            })
        }
        else{
        res.status(404).json({
            message: 'Country name or code not valid'
        })
    }
    } catch (e) {
        res.status(422).json({
            status: 503,
            message: 'Server Error'
        })
    }
})

module.exports = router;