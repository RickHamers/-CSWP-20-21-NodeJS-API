// Rick Hamers - 2019-12-11 15:43
//auth_controller.js - request handling for authentication purposes


/* Requiring the necessary libraries and assets */
let User = require('../model/user');
const assert = require('assert');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config/config');
const ApiError = require('../model/api_error');
const path = require('path');
const moment = require('moment');

/* Exporting the controller functions so they can be used by the other classes */
module.exports = {

    getProfilePicture(req, res, next){
        console.log("\n" + '=-=-=-=-=-=-=-=-=-=-=-= GET PROFILE PICTURE =-=-=-=-=-=-=-=-=-=-=-');

        try {
            /* validation */
            assert(req.query.username, 'username must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const username = req.body.username || '';

            User.findOne({username: username})
                .then((user) => {
                    if(user !== null){
                        try{
                            res.status(200).json({profilePicture: user.profilePicture}).end();
                        } catch(error) {next(new ApiError(error.message, 500))}
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })

        } catch(error) {next(new ApiError(error.message, 422))}
    },

    uploadProfilePicture(req, res, next){
        console.log("\n" + '=-=-=-=-=-=-=-=-=-=-=-= POST PROFILE PICTURE =-=-=-=-=-=-=-=-=-=-=-');

        try {
            /* validation */
            assert(req.body.imageData, 'imageData must be provided');
            assert(req.body.username, 'username must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const imageData = req.body.imageData || '';
            const username = req.body.username || '';

            User.findOne({username: username})
                .then((user) => {
                    if(user !== null || undefined){
                        user.updateOne({profilePicture: imageData})
                        .then( () => {
                            console.log('-=-=-=-=-=-=-=-=-=-=- Updating user ' + user.username + '\'s profile picture -=-=-=-=-=-=-=-=-=-=-');
                            user.save()
                            .then(() => {res.status(200).json('Uploaded profile picture').end()})
                            .catch((error) => {next(new ApiError((error.toString()), 500))})
                        })
                        .catch((error) => next(new ApiError(error.toString(), 500)))
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })
        } catch(error) {next(new ApiError(error.message, 422))}
    }
};
