/*****************************************************************************************************************
@Author:pranayusg
@Description: Token verification is done in this file
*****************************************************************************************************************/

const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');

module.exports = (req, res, next) => {
    try { 
        const token=req.headers.authorization.split(" ")[1];
        
        // jwt.verify verifies and returns decoded token while decode only returns decoded token for the provided input token
        const decoded=jwt.verify(token, process.env.PRIVATE_KEY); 

        logger.debug(`Auth Success ${req.originalUrl} - ${req.method} - ${req.ip}`);

        req.userData=decoded;
        next();
    }
    catch (error) {
        logger.error(`Auth failed ${req.originalUrl} - ${req.method} - ${req.ip} - ${req.path}`);
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};