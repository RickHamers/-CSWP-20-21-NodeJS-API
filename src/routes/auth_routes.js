// Rick Hamers - 2019-12-11 15:30
//auth_routes.js - request router for authentication

/* Requiring the necessary libraries and assets */
const express = require('express');
const auth_controller = require('../controllers/auth_controller.js'); 
let VerifyToken = require('../auth/auth.js');

/* Creating the express router */
let routes = express.Router();

/* Route for registering a user */
routes.post('/register', auth_controller.registerUser);

/* Route for logging in */
routes.post('/login', auth_controller.loginUser);

/* Route for logging out */
routes.get('/logout', VerifyToken, auth_controller.logoutUser);

/* Route for changing passwords */
routes.put('/change-password', VerifyToken, auth_controller.changePassword);

/* Route for deleting an account */
routes.delete('/api/user', VerifyToken, auth_controller.deleteUser);

/* Exporting the routes so they can be used by the other classes */
module.exports = routes;