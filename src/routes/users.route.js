const express = require('express');
const rateLimiter = require('../middlewares/rateLimiter.middleware');

const router = express.Router();

const userControllers = require('../controllers/users.controller');
const checkAuth = require('../middlewares/checkAuth.middleware');
const inputValidator = require('../middlewares/inputValidator.middleware');

router.post(
  '/signup',
  rateLimiter.userRateLimiter,
  inputValidator.validate('createUser'),
  userControllers.signup
);
router.post('/signin', userControllers.signin);
router.get('/decodetoken', checkAuth, userControllers.decodetoken);

module.exports = router;
