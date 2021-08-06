const express = require('express')
const checkAuth = require('../middlewares/checkAuth.middleware')
const covidControllers = require('../controllers/covid.controller');

const router = express.Router();

router.get('/country/name/:name',checkAuth,covidControllers.countryInPath)
router.get('/country/name', checkAuth,covidControllers.countryInQuery )

module.exports = router;