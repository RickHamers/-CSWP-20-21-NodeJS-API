// Rick Hamers - 2019-12-11 15:13
// ApiError.js - Define template for API error handling

'use strict';

class ApiError {

    constructor(message, code) {
        this.message = message;
        this.code = code;
        this.datetime = new Date().toISOString()
    }

}

/* export the class for use elsewhere */
module.exports = ApiError;