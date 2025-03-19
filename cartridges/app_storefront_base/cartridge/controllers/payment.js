'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var URLUtils = require('dw/web/URLUtils');

// GET request to display the Address Payment form
server.get('Show', csrfProtection.generateToken, function (req, res, next) {
    var addressForm = server.forms.getForm('addresspayment');
    addressForm.clear(); // Clears any previously entered form data

    res.render('account/addressPayment', {
        actionUrl: URLUtils.url('Payment-Submit').toString(), // The form's submit URL
        addressForm: addressForm
    });
    next();
});

// POST request to handle form submission
server.post('Submit', csrfProtection.validateRequest, function (req, res, next) {
    var addressForm = server.forms.getForm('addresspayment');

    if (addressForm.valid) {
        // If the form is valid, redirect to a success page
        res.redirect(URLUtils.url('Payment-Success'));
    } else {
        // If the form is invalid, re-render the form with validation messages
        res.render('account/addressPayment', {
            actionUrl: URLUtils.url('Payment-Submit').toString(),
            addressForm: addressForm
        });
    }

    next();
});

// Export the server's controller module
module.exports = server.exports();
