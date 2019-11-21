# Changelog

## [RHa] - Version 1.4.0 - 2019-21-11
### Add bidding functionality
* Add POST/DELETE bid routes to advertisement routes
* Add POST/DELETE bid functions to advertisement controller

## [RHa] - Version 1.3.1 - 2019-19-11
### Rectify incorrect postCommentOnComment() assertion
* Change assertion in postCommentOnComment() from "advertisement" to "advertisementId"

## [RHa] - Version 1.3.0 - 2019-18-11
### Add changePassword functionality
* Add route & functionality for changing a user account's password.

## [RHa] - Version 1.2.1 - 2019-14-11
### Fix verifyToken() middleware function
* Add module.exports to auth.js to export verifyToken() to be used by other classes

## [RHa] - Version 1.2.0 - 2019-14-11
### Add advertisement functionality
* Add advertisement & comment models
* Add advertisement routes
* Add advertisement controller

## [RHa] - Version 1.1.1 - 2019-12-11
### Bugfix for endpoint mapping
* Fix incorrect endpoint mapping

## [RHa] - Version 1.1.0 - 2019-12-11
### Implement authentication functionality
* Add user & auth models
* Add auth routes
* Add auth controller

## [RHa] - Version 1.0.0 - 2019-12-11
### Initial setup
* Define basic project structure
* Add basic setup & configuration
* Add start scripts & dependencies
* Add ApiError template
