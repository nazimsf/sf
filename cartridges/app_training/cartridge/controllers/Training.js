'use strict';

var server = require('server');

// Define a new GET endpoint with the route "HelloWorld"
server.get('HelloWorld', function (req, res, next) {
    var myVariable = "Just a string";

    // Render the ISML template and pass the variable
    res.render("training/myfirsttemplate", {
        myVariable: myVariable
    });

    return next(); // Ensure the middleware chain continues
});

module.exports = server.exports();