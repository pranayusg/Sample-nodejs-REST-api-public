/*****************************************************************************************************************
@Author:pranayusg
@Description: Token verification is done in this file
*****************************************************************************************************************/
const fs = require('fs');
const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');

var config = readConfig();
function readConfig() 
{
    return JSON.parse(fs.readFileSync('src/Models/config.json'));
}

module.exports = (req, res, next) => {
    try { 
        const token=req.headers.authorization.split(" ")[1];
        // jwt.verify verifies and returns decoded token while decode only returns decoded token for the provided input token
        const decoded=jwt.verify(token, config.privateKey); 

        logger.debug('Auth Success')
        logger.info(`Auth Success ${req.originalUrl} - ${req.method} - ${req.ip}`)

        req.userData=decoded;
        next();
    }
    catch (error) {
        logger.debug('Auth failed')
        logger.error(`Auth failed ${req.originalUrl} - ${req.method} - ${req.ip} - ${req.path}`)
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};