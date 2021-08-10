const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const rateLimiter = require('../middlewares/rateLimiter.middleware');
const covidControllers = require('../controllers/covid.controller');

const router = express.Router();

router.get('/country/name',rateLimiter.covidRateLimiter, checkAuth,covidControllers.countryInQuery )
router.get('/country/name/:name',rateLimiter.covidRateLimiter,checkAuth,covidControllers.countryInPath)

module.exports = router;