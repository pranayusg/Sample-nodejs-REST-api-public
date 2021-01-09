const express = require('express')
const router = express.Router();
var request = require('request-promise');
var fs = require('fs');

const checkAuth = require('../middleware/checkAuth');
var config = readConfig();

function readConfig() 
{
    return JSON.parse(fs.readFileSync('api/database/config.json'));
}

router.get('/categories/country/:name', async (req, res) => {
    var country = req.params.name;
    var options = {
        headers: {
            "x-rapidapi-key": config.amazonApiKey,
            "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
            "useQueryString": true
        },
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/categories?country=' + country + '&format=json'
    };
    try {
        var data = await request(options)
        res.status(200).json(JSON.parse(data))
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'No data found'
        })
    }
})

router.get('/product/search',checkAuth, async (req, res) => {
    var product = req.query.product;
    var country='US',page=1,category="aps";
    if(req.query.country!= undefined){
        country=req.query.country
    }
    if(req.query.page!= undefined){
        page=req.query.page
    }
    if(req.query.category!= undefined){
        category=req.query.category
    }
    var options = {
        headers: {
            "x-rapidapi-key": config.amazonApiKey,
            "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
            "useQueryString": true
        },
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=' + product +'&country='+ country+'&page='+page+'&category='+category+'&format=json'
    };
    try {
        var data = await request(options)
        res.status(200).json(JSON.parse(data))
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'No data found'
        })
    }
})

router.get('/product/details',checkAuth, async (req, res) => {
    var asin = req.query.asin;
    var country='US',page=1,category="aps";
    if(req.query.country!= undefined){
        country=req.query.country
    }
    if(req.query.page!= undefined){
        page=req.query.page
    }
    if(req.query.category!= undefined){
        category=req.query.category
    }
    var options = {
        headers: {
            "x-rapidapi-key": config.amazonApiKey,
            "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
            "useQueryString": true
        },
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/details?asin=' + asin +'&country='+ country+'&format=json'
    };
    try {
        var data = await request(options)
        res.status(200).json(JSON.parse(data))
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'No data found'
        })
    }
})

router.get('/product/reviews',checkAuth, async (req, res) => {
    var asin = req.query.asin;
    var country='US',page=1,category="aps",variants=1;
    if(req.query.country!= undefined){
        country=req.query.country
    }
    if(req.query.page!= undefined){
        page=req.query.page
    }
    if(req.query.variants!= undefined){
        variants=req.query.category
    }
    // 1 - reviews for all product variants (default)
    // 0 - reviews only for specified product ASIN
    const options = {
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews',
        qs: {
          asin: asin,
          page: page,
          variants: variants,
          country: country
        },
        headers: {
          'x-rapidapi-key': config.amazonApiKey,
          'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com',
          useQueryString: true
        }
      };
    try {
        var data = await request(options)
        res.status(200).json(JSON.parse(data))
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'No data found'
        })
    }
})


module.exports = router;

// List of countries for categories Default is US
// US: 'www.amazon.com',
// AU: 'www.amazon.com.au',
// BR: 'www.amazon.com.br',
// CA: 'www.amazon.ca',
// CN: 'www.amazon.cn',
// FR: 'www.amazon.fr',
// DE: 'www.amazon.de',
// IN: 'www.amazon.in',
// IT: 'www.amazon.it',
// MX: 'www.amazon.com.mx',
// NL: 'www.amazon.nl',
// SG: 'www.amazon.sg',
// ES: 'www.amazon.es',
// TR: 'www.amazon.com.tr',
// AE: 'www.amazon.ae',
// GB: 'www.amazon.co.uk',
// JP:   'www.amazon.jp',