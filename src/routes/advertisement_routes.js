// Rick Hamers - 2019-11-14 14:49
//advertisement_routes.js - request router for advertisements

/* Requiring the necessary libraries and assets */
const express = require('express');
const advertisement_controller = require('../controllers/advertisement_controller');
let VerifyToken = require('../auth/auth');

/* Creating the express router */
let routes = express.Router();

/* The GET advertisement request */
routes.get('/advertisement', VerifyToken, advertisement_controller.getAdvertisement);

/* The GET comment request */
routes.get('/comment', VerifyToken, advertisement_controller.getComment);

/* the GET all advertisements request */
routes.get('/advertisements', VerifyToken, advertisement_controller.getAllAdvertisements);

/* The POST advertisement request */
routes.post('/advertisement', VerifyToken, advertisement_controller.postAdvertisement);

/* The POST advertisement request */
routes.post('/advertisement/comment', VerifyToken, advertisement_controller.postCommentOnAdvertisement);

/* The POST advertisement request */
routes.post('/advertisement/comments', VerifyToken, advertisement_controller.postCommentOnComment);

/* the UPDATE advertisement request */
routes.put('/advertisement', VerifyToken, advertisement_controller.updateAdvertisement);

/* the UPDATE comment request */
routes.put('/comment', VerifyToken, advertisement_controller.updateComment);

/* The DELETE specific advertisement request */
routes.delete('/advertisement', VerifyToken, advertisement_controller.deleteAdvertisement);

/* The DELETE specific comment request */
routes.delete('/comment', VerifyToken, advertisement_controller.deleteComment);

/* Exporting the routes so they can be used by the other classes */
module.exports = routes;