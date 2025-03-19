// YourController.js

'use strict';

var server = require('server');
var Response = require('dw/system/Response');

// Route for rendering the page
server.get('showPage', function (req, res, next) {
    res.render('inputAndButton');  // Render the 'inputAndButton.isml' template
    next();
});

// Route for handling the AJAX request
server.get('fetchData', function (req, res, next) {
    // Capture the input from the AJAX request (querystring input)
    var inputText = req.querystring.input || 'No input provided';  // Default if no input

    // Check if the input is valid
    if (inputText) {
        // Send a JSON response back with the text
        res.json({ text: 'You searched for: ' + inputText });
    } else {
        // If there's no input, send an error response
        res.status(400).json({ error: 'No input received' });
    }

    next();
});

module.exports = server.exports();
