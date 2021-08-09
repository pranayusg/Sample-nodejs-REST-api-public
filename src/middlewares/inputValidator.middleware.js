const { body } = require('express-validator');
const { Console } = require('winston/lib/winston/transports');

exports.validate = (method) => {
    switch (method) {
      case 'createUser': {
       return [ 
          body('mail', 'Invalid email').isEmail(),
          body('password', 'Password must be minimum 3 characters').isLength({ min: 3 })
         ]   
      }
    }
  }