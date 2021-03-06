/*****************************************************************************************************************
@Author:pranayusg
@Description: Token verification is done in this file
*****************************************************************************************************************/
const fs = require('fs');
const jwt = require('jsonwebtoken');

var config = readConfig();
function readConfig() 
{
    return JSON.parse(fs.readFileSync('api/database/config.json'));
}

module.exports = (req, res, next) => {
    try { 
        const token=req.headers.authorization.split(" ")[1];
        // jwt.verify verifies and returns decoded token while decode only returns decoded token for the provided input token
        const decoded=jwt.verify(token, config.privateKey); 
        req.userData=decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};