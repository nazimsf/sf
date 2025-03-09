'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var Transaction = require('dw/system/Transaction');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var currentBasket = BasketMgr.getCurrentBasket();
    var cartTotalThreshold = 200; // This should be replaced with the site preference value
    var showCartMessage = false;
    var cartMessage = '';

    if (currentBasket) {
        Transaction.wrap(function () {
            // Calculate totals if needed
            if (currentBasket.currencyCode !== req.session.currency.currencyCode) {
                currentBasket.updateCurrency();
            }
        });

        // Check if cart total exceeds the threshold
        var cartTotal = currentBasket.totalGrossPrice.value;
        if (cartTotal > cartTotalThreshold) {
            showCartMessage = true;
            cartMessage = "Congratulations! You have exceeded $200 in your cart.";
        }
    }

    // Add the message data to the viewData
    viewData.showCartMessage = showCartMessage;
    viewData.cartMessage = cartMessage;

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();