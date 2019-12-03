# Changelog

## [RHa] - Version 1.6.1 - 2019-12-3
### Update CORS implementation
* Update CORS implementation to use the cors nodejs package

## [RHa] - Version 1.6.0 - 2019-12-2
### Update profile picture functionality
* Update profile picture functionality to encode & decode images instead of using ng2-file-upload & multer
 
## [RHa] - Version 1.5.5 - 2019-11-29
### Update postBid() functionality
* Update postBid() functionality with a check for values equal to or smaller than zero

## [RHa] - Version 1.5.4 - 2019-11-29
### Improve logging
* Update logging with reduction to the amount of lines printed to improve readability
* Update logging with newlines before function calls & connections to improve readability
* Switch Mongo connection console.log() to logger.info()
* Fix date format in CHANGELOG.md

## [RHa] - Version 1.5.3 - 2019-11-28
### Fix autopopulate bids
* Update autopopulate advertisement in model to call autopopulate bids functionality

## [RHa] - Version 1.5.2 - 2019-11-26
### Fix DELETE USER route
* Update DELETE USER functionality in auth_controller to implement the more RESTful route
* Fix incorrect URL routing
* Fix deleteUser() function's username & password initialization

## [RHa] - Version 1.5.1 - 2019-11-26
### Update DELETE USER functionality
* Update DELETE USER functionality in auth_controller to be more RESTful

## [RHa] - Version 1.5.0 - 2019-11-26
### Add DELETE USER functionality
* Add DELETE USER functionality in auth_controller
* Add DELETE USER route in auth_routes

## [RHa] - Version 1.4.1 - 2019-11-25
### Fix bidding functionality
* Fix bids being pushed to comments array in MongoDB

## [RHa] - Version 1.4.0 - 2019-11-21
### Add bidding functionality
* Add POST/DELETE bid routes to advertisement routes
* Add POST/DELETE bid functions to advertisement controller

## [RHa] - Version 1.3.1 - 2019-11-19
### Rectify incorrect postCommentOnComment() assertion
* Change assertion in postCommentOnComment() from "advertisement" to "advertisementId"

## [RHa] - Version 1.3.0 - 2019-11-18
### Add changePassword functionality
* Add route & functionality for changing a user account's password.

## [RHa] - Version 1.2.1 - 2019-11-14
### Fix verifyToken() middleware function
* Add module.exports to auth.js to export verifyToken() to be used by other classes

## [RHa] - Version 1.2.0 - 2019-11-14
### Add advertisement functionality
* Add advertisement & comment models
* Add advertisement routes
* Add advertisement controller

## [RHa] - Version 1.1.1 - 2019-11-12
### Bugfix for endpoint mapping
* Fix incorrect endpoint mapping

## [RHa] - Version 1.1.0 - 2019-11-12
### Implement authentication functionality
* Add user & auth models
* Add auth routes
* Add auth controller

## [RHa] - Version 1.0.0 - 2019-11-12
### Initial setup
* Define basic project structure
* Add basic setup & configuration
* Add start scripts & dependencies
* Add ApiError template
