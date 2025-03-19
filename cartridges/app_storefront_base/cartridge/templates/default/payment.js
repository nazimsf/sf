'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {
    res.render('address-payment', {
        // Pass any necessary data to the template
    });
    next();
});

module.exports = server.exports();