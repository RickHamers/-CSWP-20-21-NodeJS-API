// Rick Hamers - 2128706
// api_error.js - define template for API error handling

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
