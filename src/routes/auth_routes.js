// Rick Hamers - 2019-12-11 15:30
//auth_routes.js - request router for authentication

/* Requiring the necessary libraries and assets */
const express = require('express');
const auth_controller = require('../controllers/auth_controller'); 

/* Creating the express router */
let routes = express.Router();

/* Route for registering a user */
routes.post('/register', auth_controller.registerUser);

/* Route for logging in */
routes.post('/login', auth_controller.loginUser);

/* Route for logging out */
routes.get('/logout', auth_controller.logoutUser);

/* Exporting the routes so they can be used by the other classes */
module.exports = routes;