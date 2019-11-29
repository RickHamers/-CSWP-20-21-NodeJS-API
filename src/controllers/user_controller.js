// Rick Hamers - 2019-12-11 15:43
//auth_controller.js - request handling for authentication purposes


/* Requiring the necessary libraries and assets */
let User = require('../model/user');
const assert = require('assert');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config/config');
const ApiError = require('../model/api_error');
const multer = require('multer');
const path = require('path');
const moment = require('moment');

/* File directory for images */
const DIR = './src/data/img';

/* Multer setup */
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

/* Exporting the controller functions so they can be used by the other classes */
module.exports = {

    getProfilePicture(req, res, next){
        console.log("\n" + '=-=-=-=-=-=-=-=-=-=-=-= GET PROFILE PICTURE =-=-=-=-=-=-=-=-=-=-=-');

        try {
            if(!req.file) {
                console.log("ERROR: No file received");
                return(res.send({
                    success: false
                }));
            } else {
                console.log("SUCCESS: File received");
                return res.send({
                    success: true
                })
            }
        } catch(error) {next(new ApiError(error.message, 422))}
    },

    uploadProfilePicture(req, res, next){
        console.log("\n" + '=-=-=-=-=-=-=-=-=-=-=-= POST PROFILE PICTURE =-=-=-=-=-=-=-=-=-=-=-');

        try {
            


        } catch(error) {next(new ApiError(error.message, 422))}
    }
};