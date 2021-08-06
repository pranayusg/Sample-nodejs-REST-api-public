const { body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
      case 'createUser': {
       return [ 
          body('email', 'Invalid email').isEmail(),
          body('password', 'Password must be minimum 3 characters').isLength({ min: 3 })
         ]   
      }
    }
  }