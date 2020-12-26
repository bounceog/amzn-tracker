const express = require('express');

const MongoHandler = require('../src/handler/mongo-handler');
const RedisHandler = require('../src/handler/redis-handler');
const DataRouter = require('./DataRouter');
const WebRouter = require('./WebRouter');
const { renderIndex, renderProduct } = require('../src/render');
const { speedLimiter } = require('../middleware/limit');

const router = express.Router();
const mongoHandler = new MongoHandler(process.env.MONGO_URI);
const redisHandler = new RedisHandler(process.env.REDIS_PORT);

const webRouter = new WebRouter(mongoHandler, redisHandler);
const dataRouter = new DataRouter(mongoHandler, redisHandler);

const cache = (req, res, next) => {
    const ID = req.query.id;
    
    if(typeof ID !== 'undefined') {
        redisHandler.get(ID)
            .then((data) => renderProduct(JSON.parse(data), res))
            .catch((err) => next(err));
    } else {
        redisHandler.get('products')
            .then((data) => renderIndex(JSON.parse(data), res))
            .catch((err) => next(err));
    }
};

router.get('/', (req, res, err) => res.redirect('/view/all'));
router.use('/view', cache, webRouter.router);
router.use('/data', speedLimiter, dataRouter.router);

module.exports = router;