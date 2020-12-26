const express = require('express');

const { renderIndex, renderProduct } = require('../src/render');

class WebRouter {

    constructor(mongoHandler, redisHandler) {
        this.router = express.Router();

        this.router.get('/all', (req, res, next) => {
            mongoHandler.getAllProducts()
                .then((products) => {
                    redisHandler.set('products', 5000, JSON.stringify(products));
                    renderIndex(products, res);
                })
                .catch((err) => {
                    next(err);
                })
        });
        
        this.router.get('/product', (req, res, next) => {
            const ID = req.query.id;
            if(typeof ID == 'undefined') next('No ID provided.');
        
            mongoHandler.find(ID)
                .then((product) => {
                    redisHandler.set(ID, 5000, JSON.stringify(product));
                    renderProduct(product, res);
                })
                .catch((err) => {
                    next(err);
                });
        });
    }
}

module.exports = WebRouter;