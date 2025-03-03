'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var productHelpers = require('*/cartridge/scripts/helpers/productHelpers'); // Move require inside the function

    var discountPercentage = null;
    var product = res.getViewData().product;

    if (product && product.price && product.price.list && product.price.sales) {
        discountPercentage = productHelpers.calculatePercentageOff(product.price.list.value, product.price.sales.value);
    }

    res.setViewData({ discountPercentage: discountPercentage });
    next();
});

module.exports = server.exports();