/** *********************************************************************************************************************
@Author:pranayusg
@Description: This file contains demo to different types of requests and various types of parameters used in a REST API
*********************************************************************************************************************** */
const express = require('express');

const router = express.Router();
const demoRequestsControllers = require('../controllers/demoRequests.controller');

const checkAuth = require('../middlewares/checkAuth.middleware');

router.get('/', checkAuth, checkAuth, demoRequestsControllers.getRequests);
router.get('/statuscodes', checkAuth, demoRequestsControllers.statuscodes);
router.get('/parameters', checkAuth, demoRequestsControllers.parameters);
router.get('/:pathparameter', checkAuth, demoRequestsControllers.pathParameter);
router.post('/', checkAuth, demoRequestsControllers.postRequests);
router.post(
  '/queryparameters',
  checkAuth,
  demoRequestsControllers.queryParameters
);
router.patch('/', checkAuth, demoRequestsControllers.patchRequests);
router.delete('/', checkAuth);

module.exports = router;
