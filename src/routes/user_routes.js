// Rick Hamers - 2019-20-11 15:37
//user_routes.js - request router for users

/* Requiring the necessary libraries and assets */
const express = require('express');
const user_controller = require('../controllers/user_controller.js'); 
let VerifyToken = require('../auth/auth.js');

/* Creating the express router */
let routes = express.Router();

/* Route for retrieving a profile picture */
routes.get('/user/profile-picture', VerifyToken, user_controller.getProfilePicture);

/* Route for uploading a profile picture */
routes.post('/user/profile-picture', VerifyToken, user_controller.uploadProfilePicture);

/* Exporting the routes so they can be used by the other classes */
module.exports = routes;

