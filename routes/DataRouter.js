const express = require('express');

const { getDateArr, isLater } = require('../src/utils');
const { serveCsv } = require('../src/file');

class DataRouter {
    
    constructor(mongoHandler, redisHandler) {
        this.router = express.Router();

        this.router.get('/all', (req, res, next) => {
            mongoHandler.getAllProducts()
                .then((products) => {
                    const sortedProducts = products.sort((a, b) => new Date(a.added_at) - new Date(b.added_at));
                    const cols = [{ key: 'date' }];
        
                    const dates = getDateArr(new Date(sortedProducts[0].added_at), new Date());
                    const data = [];

                    for(let x = 0; x < dates.length; x++) {
                        data.push({ date: dates[x] });
                    }

                    for(let i = 0; i < sortedProducts.length; i++) {
                        cols.push({ key: sortedProducts[i].name });
                    }

                    data.forEach((obj) => {
                        sortedProducts.forEach((prod) => {
                            for(let x = 0; x < prod.prices.length; x++) {
                                if(isLater(new Date(prod.prices[x].date).getTime(), obj.date.getTime())) {
                                    continue;
                                } else {
                                    obj[prod.name] = prod.prices[x].value;
                                }
                            }
                        });
                    });
        
                    redisHandler.set('products', 5000, JSON.stringify(products));
                    serveCsv('full_dump', data, res, cols);
                })
                .catch((err) => {
                    next(err);
                });
        });
        
        this.router.get('/:ID', (req, res, next) => {
            const ID = req.params.ID;
            if(typeof ID == 'undefined') next('No ID provided.')
        
            mongoHandler.find(ID)
                .then((product) => {
                    redisHandler.set(ID, 5000, JSON.stringify(product));
                    serveCsv(ID, product.prices, res);
                })
                .catch((err) => {
                    next(err);
                });
        });
    }
}

module.exports = DataRouter;