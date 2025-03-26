'use strict'

var server = require('server');
var controller = require('app_ training/cartridge/controllers/cart')

server.extend(module.superModule);

server.append('MiniCartShow', function(req, res, next){
    var viewData = res.getViewData();

    viewData.example = "One String"

    res.setViewData(viewData);

    return next();

})

module.exports = server.exports();