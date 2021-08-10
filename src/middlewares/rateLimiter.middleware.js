const rateLimit = require("express-rate-limit");

const userRateLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 5, 
    message:{message:'Too many requests, rate limiter activated ,please try again later after 30 secs.'}
  });

const covidRateLimiter = rateLimit({
  windowMs: 30000, 
  max: 2, 
  message:{message:'Too many requests, rate limiter activated ,please try again later after 30 secs.'}
});  

  module.exports={userRateLimiter,covidRateLimiter};

