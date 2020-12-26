const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const rateLimiter = rateLimit({
    windowMs: 5000,
    max: 40,
    message: "Too many requests."
});

const speedLimiter = slowDown({
    windowMs: 5000,
    delayAfter: 10,
    delayMs: 500
});


module.exports = {
    rateLimiter: rateLimiter,
    speedLimiter: speedLimiter
};