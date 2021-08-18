/** *********************************************************************************************************************
@Author:pranayusg
@Description: This file contains demo to different types of requests and various types of parameters used in a REST API
*********************************************************************************************************************** */
const express = require('express');
const demoRequestsControllers = require('../controllers/demoRequests.controller');
const checkAuth = require('../middlewares/checkAuth.middleware');

const router = express.Router();

router.all('*', checkAuth);

router
  .route('/')
  .get(demoRequestsControllers.getRequests)
  .post(demoRequestsControllers.postRequests)
  .patch(demoRequestsControllers.patchRequests)
  .delete(demoRequestsControllers.deleteRequests);

router.route('/statuscodes').get(demoRequestsControllers.statuscodes);
router.route('/parameters').get(demoRequestsControllers.parameters);

router.get('/:pathparameter', demoRequestsControllers.pathParameter);
router.post('/queryparameters', demoRequestsControllers.queryParameters);

module.exports = router;
