const index = (data, res) => {
    res.render('index', {
        products: data
    });
};

const product = (data, res) => {
    res.render('product', {
        product: data
    });
};

module.exports = {
    renderIndex: index,
    renderProduct: product
};