// Rick Hamers - 2019-12-11 13:58
//server.js - project main file

/* require necessary modules and files */
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const ApiError = require('./src/model/ApiError');
const { webPort, logger } = require('./src/config/config');
require('./src/config/mongo.db');

/* require all routes */
// routes to be added later

/* server setup */
const port = process.env.PORT || webPort;
const app = express();

/* user morgan as logger and user bodyparser to parse JSON */
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

/* parse all the defined endpoints */
// endpoints yet to be added

/* catch all non-existing endpoint requests and report a 404 error */
app.use('*', function (req, res, next) {
    // logger.error('Non-existing endpoint')
    const error = new ApiError('Non-existing endpoint', 404);
    next(error)
});

/* listen for incoming requests */
app.listen(port, () => {
    logger.info('-=-=-=-=-=-=-=-=-=-=- Server running, listening on port ' + port + ' -=-=-=-=-=-=-=-=-=-=-');
});

/* Export the server for testing purposes */
module.exports = app;