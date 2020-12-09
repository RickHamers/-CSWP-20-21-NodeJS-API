// Rick Hamers - 2128706
//auth_controller.js - request handling for authentication purposes


/* Requiring the necessary libraries and assets */
let User = require('../model/user');
const assert = require('assert');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config/config');
const ApiError = require('../model/api_error');
const moment = require('moment');


/* Exporting the controller functions so they can be used by the other classes */
module.exports = {

    registerUser(req, res, next){
        console.log("\n" + '-=-=-=-=-=-=-=-=-=-=-=-=-= (POST) REGISTER USER =-=-=-=-=-=-=-=-=-=-=-=-=-');
        try{
            /* Validation */
            console.log(req.body);
            assert(req.body.username, 'username must be provided');
            assert(req.body.password, 'password must be provided');

            /* Making constants with username and password from the request's body */
            const username = req.body.username || '';
            const password = req.body.password || '';

            /* Hashing the password with bcrypt */
            const hashedPassword = bcrypt.hashSync(password);

            /* Create a new user with these constants */
            const newUser = new User({username: username, password: hashedPassword});

            /* Save the new user to the database */
            User.findOne({username: username})
                .then((user) => {
                    if(user === null){
                        console.log('-=-=-=-=-=-=-=-=-=-=- Creating user ' + username + ' -=-=-=-=-=-=-=-=-=-=-');
                        newUser.save() //Saving the User to the database - .save returns a promise
                            .then(() => {
                                return res.status(200).json(newUser).end();
                            })
                            .catch((error) => next(new ApiError(error.toString(), 500)))
                    }else{
                        next(new ApiError('person already exists in the database', 409));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)))
        } catch(error) {next(new ApiError(error.message, 422))}
    },

    loginUser(req, res, next) {
        console.log("\n" + '=-=-=-=-=-=-=-=-=-=-=-=-=- (POST) LOGIN USER -=-=-=-=-=-=-=-=-=-=-=-=-=');
        try{
            assert(req.body.username, 'username must be provided');
            assert(req.body.password, 'password must be provided');

            /* Making constants with username and password from the request's body */
            const username = req.body.username || '';
            const password = req.body.password || '';

            /* Log the user in */
            User.findOne({ username: username })
                .then((user) => {
                    if (user !== null){
                        let passwordIsValid = bcrypt.compareSync(password, user.password);
                        if(!passwordIsValid) {
                            console.log('-=-=-=-=-=-=-=-=-=-=- auth failed -=-=-=-=-=-=-=-=-=-=-');
                            return res.status(401).send({ auth: false, token: null })
                        }  else if (passwordIsValid) {
                            console.log('-=-=-=-=-=-=-=-=-=-=- auth succeeded -=-=-=-=-=-=-=-=-=-=-');
                            var token = jwt.sign({ id: user._id }, config.secretkey, {
                                expiresIn: 86400 //Expires in 24 hrs
                            });
                            res.status(200).send({ auth: true, username: user.username, id: user._id, token: token, expiresAt: moment().add(24, 'hours').valueOf()});
                        }
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)))
        } catch(error) {next(new ApiError(error.message, 422))}
    },

    logoutUser(req, res, next){
        console.log("\n" + '=-=-=-=-=-=-=-=-=-=-=-=-=- (GET) LOGOUT USER -=-=-=-=-=-=-=-=-=-=-=-=-=');
        res.status(200).send({ auth: false, token: null })
    },

    changePassword(req, res, next) {
        console.log("\n" + '-=-=-=-=-=-=-=-=-=-=-=-=- (PUT) CHANGE PASSWORD -=-=-=-=-=-=-=-=-=-=-=-=');

        try {
            /* validation */
            assert(req.body.username, 'username must be provided');
            assert(req.body.password, 'password must be provided');
            assert(req.body.newPassword, 'new password must be provided');


            /* making constants with (new) username and (new) password from the request's body */
            const username = req.body.username || '';
            const password = req.body.password || '';
            const newPassword = req.body.newPassword || '';

            /* hashing the password with bcrypt */
            const hashedNewPassword = bcrypt.hashSync(newPassword);

            /* update the user with the given constants */
            User.findOne({ username: username })
                .then((user) => {
                    if(user !== null){
                        if(bcrypt.compareSync(password, user.password)){
                            console.log('-=-=-=-=-=-=-=-=-=-=- Updating user ' + user.username + ' -=-=-=-=-=-=-=-=-=-=-');
                            User.updateOne({username: username}, {password: hashedNewPassword}) // Find first record with the specific username and update it in the database - .findOneAndUpdate returns a promise
                                .then( () => {
                                    return res.status(200).json('user updated').end()
                                })
                                .catch((error) => next(new ApiError(error.toString(), 500)))
                        } else {
                            next(new ApiError('password does not match', 401));
                        }
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                });
        } catch (error) {next(new ApiError(error.message, 500))
        }
    },

    deleteUser(req, res, next) {
        console.log("\n" + '-=-=-=-=-=-=-=-=-=-=-=-=-=- DELETE ACCOUNT -=-=-=-=-=-=-=-=-=-=-=-=-=');
  
        try {
          /* validation */
          assert(req.query.id, 'id must be provided');
  
          /* making constants with the id from the request URL */
          const id = req.query.id || '';
  
          /* update the user with the given constants */
          User.findOne({
              _id: id
            })
            .then((user) => {
              if (user !== null) {
                console.log('-=-=-=-=-=-=-=-=-=-=- Deleting user ' + user.username + ' -=-=-=-=-=-=-=-=-=-=-');
                User.deleteOne({
                    username: user.username,
                    password: user.password
                  })
                  .then(() => {
                    return res.status(200).json('user deleted').end()
                  })
                  .catch((error) => next(new ApiError(error.toString(), 500)))
              } else {
                next(new ApiError('user not found', 404));
              }
            })
        } catch (error) {
          next(new ApiError(error.message, 500))
        }
      }
};
