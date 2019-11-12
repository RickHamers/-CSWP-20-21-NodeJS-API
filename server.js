// Rick Hamers - 2019-12-11 13:58
//server.js - project main file

/* Require necessary modules and files */
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const ApiError = require('./src/model/api_error');
const { webPort, logger } = require('./src/config/config');
require('./src/config/mongo.db');

/* Require all routes */
const auth_routes = require('./src/routes/auth_routes.js'); 

/* Server setup */
const port = process.env.PORT || webPort;
const app = express();

/* User morgan as logger and user bodyparser to parse JSON */
app.use(morgan('dev'));
app.use(bodyparser.json());

/* Prevent CORS pre-fight by allowing requests with origin headers */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, x-access-token ,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if(req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});

/* Parse all the defined endpoints */
app.use('/api', auth_routes);

/* Catch all non-existing endpoint requests and report a 404 error */
app.use('*', function (req, res, next) {
    // logger.error('Non-existing endpoint')
    const error = new ApiError('Non-existing endpoint', 404);
    next(error)
});

/* Listen for incoming requests */
app.listen(port, () => {
    logger.info('-=-=-=-=-=-=-=-=-=-=- Server running, listening on port ' + port + ' -=-=-=-=-=-=-=-=-=-=-');
});

/* Export the server for testing purposes */
module.exports = app;