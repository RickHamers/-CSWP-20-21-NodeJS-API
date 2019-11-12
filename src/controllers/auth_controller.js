// Rick Hamers - 2019-12-11 15:43
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

    /* Function used to post a new user */
    registerUser(req, res, next){
        console.log('-=-=-=-=-=-=-=-=-=-=- A POST request was made -=-=-=-=-=-=-=-=-=-=-' + '\n' +
                    '-=-=-=-=-=-=-=-=-=-=-=-=-= REGISTER USER =-=-=-=-=-=-=-=-=-=-=-=-=-');
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
        console.log('-=-=-=-=-=-=-=-=-=-=- A POST request was made -=-=-=-=-=-=-=-=-=-=-' + '\n' +
            '=-=-=-=-=-=-=-=-=-=-=-=-=- LOGIN USER -=-=-=-=-=-=-=-=-=-=-=-=-=');
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
        console.log('-=-=-=-=-=-=-=-=-=-=- A GET request was made -=-=-=-=-=-=-=-=-=-=-' + '\n' +
            '=-=-=-=-=-=-=-=-=-=-=-=-=- LOGOUT USER -=-=-=-=-=-=-=-=-=-=-=-=-=');
        res.status(200).send({ auth: false, token: null })
    }
};
