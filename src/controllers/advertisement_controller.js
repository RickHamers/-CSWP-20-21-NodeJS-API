// Rick Hamers - 2019-11-14 14:36
//advertisement_controller.js - request handling for advertisement purposes

/* Requiring the necessary libraries and assets */
const ApiError = require('../model/api_error');
const Advertisement = require('../model/advertisement').adverisement;
const Comment = require('../model/advertisement').comment;
const Bid = require('../model/advertisement').bid;
const User = require('../model/user');
const assert = require('assert');

module.exports = {

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- GET -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    getAllAdvertisements(req, res, next) {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=- GET all advertisements -=-=-=-=-=-=-=-=-=-=-=-=');

        /* get all advertisements with the given constant */
        Advertisement.find({}, {_id: 1, title: 1, content: 1, username: 1, upVote: 1, downVote: 1})
            .then((advertisements) => {
                if (advertisements.length > 0 ) {
                    res.status(200).json(advertisements).end()
                } else {
                    next(new ApiError('no advertisements found', 404))
                }
            })
            .catch((error) => next(new ApiError(error.toString(), 500)));
    },

    getAdvertisement(req, res, next) {
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=- GET advertisement -=-=-=-=-=-=-=-=-=-=-=-=-=');
        try {
            /* validation */
            assert(req.query.id, 'id must be provided');

            /* making constant with title from the request's body */
            const id = req.query.id || '';

            /* get advertisement with the given constant */
            Advertisement.findOne({_id: id})
                .then((advertisement) => {
                    if (advertisement !== null) {
                        console.log('-=-=-=-=-=-=-=-=-=-=- Found advertisement ' + advertisement.title + ' -=-=-=-=-=-=-=-=-=-=-');
                        res.status(200).json(advertisement).end()
                    } else {
                        next(new ApiError('advertisement not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    getComment(req, res, next) {
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=- GET comment -=-=-=-=-=-=-=-=-=-=-=-=-=');
        try {
            /* validation */
            assert(req.query.id, 'id must be provided');

            /* making constant with title from the request's body */
            const id = req.query.id || '';

            /* get comment with the given constant */
            Comment.findOne({_id: id})
                .then((comment) => {
                    if (comment !== null) {
                        res.status(200).json(comment).end()
                    } else {
                        next(new ApiError('comment not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- POST -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    postAdvertisement(req, res, next) {
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=- POST advertisement -=-=-=-=-=-=-=-=-=-=-=-=-=');

        try {
            /* validation */
            assert(req.body.username, 'username must be provided');
            assert(req.body.title, 'title must be provided');
            assert(req.body.content, 'content must be provided');

            /* making constants with username, title and content from the request's body */
            const username = req.body.username || '';
            const title = req.body.title || '';
            const content = req.body.content || '';

            /* create a new advertisement with these constants */
            console.log('-=-=-=-=-=-=-=-=-=-=- Creating advertisement ' + title + ' -=-=-=-=-=-=-=-=-=-=-');
            const newAdverisement = new Advertisement({username: username, title: title, content: content});

            /* save the new advertisement to the database */
            User.findOne({username: username})
                .then((user) => {
                    if (user !== null) {
                        Advertisement.findOne({title: title})
                            .then((advertisement) => {
                                if (advertisement === null) {
                                    newAdverisement.save() //Saving the advertisement to the database - .save returns a promise
                                        .then(() => res.status(200).json(newAdverisement).end())
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                } else {
                                    next(new ApiError('advertisement ' + title + ' already exists'))
                                }
                            })
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    postCommentOnAdvertisement(req, res, next){
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- POST comment on advertisement -=-=-=-=-=-=-=-=-=-=-=-=-=-');

        try{
            /* validation */
            assert(req.body.content, 'content must be provided');
            assert(req.body.username, 'username must be provided');
            assert(req.body.advertisementId, 'advertisement id must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const content = req.body.content || '';
            const username = req.body.username || '';
            const advertisementId = req.body.advertisementId || '';

            const newComment = new Comment({content: content, advertisementId: advertisementId, username: username});

            User.findOne({username: username})
                .then((user) => {
                    if (user !== null) {
                        Advertisement.findOne({_id: advertisementId})
                            .then((advertisement) => {
                                if (advertisement !== null) {
                                    advertisement.comments.push(newComment);
                                    Promise.all([newComment.save(), advertisement.save()])
                                        .then(() => res.status(200).json(newComment).end())
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                } else {
                                    next(new ApiError('advertisement ' + title + ' does not exists'))
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                }
                            })
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    postCommentOnComment(req, res, next){
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- POST comment on comment -=-=-=-=-=-=-=-=-=-=-=-=-=-');

        try{
            /* validation */
            assert(req.query.id, 'id must be provided');
            assert(req.body.content, 'content must be provided');
            assert(req.body.username, 'username must be provided');
            assert(req.body.advertisementId, 'advertisement id must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const id = req.query.id || '';
            const content = req.body.content || '';
            const username = req.body.username || '';
            const advertisementId = req.body.advertisementId || '';

            const newComment = new Comment({content: content, advertisementId: advertisementId, username: username});

            User.findOne({username: username})
                .then((user) => {
                    if (user !== null) {
                        Comment.findOne({_id: id})
                            .then((comment) => {
                                if (comment !== null) {
                                    comment.comments.push(newComment);
                                    Promise.all([newComment.save(), comment.save()])
                                        .then(() => res.status(200).json(newComment).end())
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                } else {
                                    next(new ApiError('advertisement ' + title + ' does not exists'))
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                }
                            })
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    postBid(req, res, next){
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- POST bid on advertisement -=-=-=-=-=-=-=-=-=-=-=-=-=-');
        
        try{
            /* validation */
            assert(req.body.amount, 'amount must be provided');
            assert(req.body.username, 'username must be provided');
            assert(req.body.advertisementId, 'advertisement id must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const amount = req.body.amount || '';
            const username = req.body.username || '';
            const advertisementId = req.body.advertisementId || '';

            newBid = new Bid({amount: amount, username: username, advertisementId: advertisementId})

            User.findOne({username: username})
                .then((user) => {
                    if (user !== null) {
                        Advertisement.findOne({_id: advertisementId})
                            .then((advertisement) => {
                                if (advertisement !== null) {
                                    advertisement.bids.push(newBid);
                                    Promise.all([newBid.save(), advertisement.save()])
                                        .then(() => res.status(200).json(newBid).end())
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                } else {
                                    next(new ApiError('advertisement ' + title + ' does not exists'))
                                        .catch((error) => next(new ApiError(error.toString(), 500)));
                                }
                            })
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('user not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- UPDATE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    updateAdvertisement(req, res, next) {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- PUT advertisement -=-=-=-=-=-=-=-=-=-=-=-=-=-');

        try {
            /* validation */
            assert(req.query.id, 'id must be provided');
            assert(req.body.title, 'title must be provided');
            assert(req.body.content, 'content must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const id = req.query.id || '';
            const title = req.body.title || '';
            const content = req.body.content || '';

            /* update the advertisement with the given constants */
            Advertisement.findOne({_id: id})
                .then((advertisement) => {
                    if (advertisement !== null) {
                        console.log('-=-=-=-=-=-=-=-=-=-=- Updating advertisement ' + advertisement.title + ' -=-=-=-=-=-=-=-=-=-=-');
                        Advertisement.updateOne({_id: id}, {title: title, content: content})
                            .then(() => res.status(200).json('advertisement updated').end())
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('advertisement not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

     updateComment(req, res, next) {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- PUT comment -=-=-=-=-=-=-=-=-=-=-=-=-=-');
        
        try {
            /* validation */
            assert(req.query.id, 'id must be provided');
            assert(req.body.content, 'content must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const id = req.query.id || '';
            const content = req.body.content || '';

            /* update the comment with the given constants */
            Comment.findOne({_id: id})
                .then((comment) => {
                    if (comment !== null) {
                        Comment.updateOne({_id: id}, {content: content})
                            .then(() => res.status(200).json('comment updated').end())
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('comment not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- DELETE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    deleteAdvertisement(req, res, next) {
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=- DELETE advertisement -=-=-=-=-=-=-=-=-=-=-=-=-=');

        try {
            /* validation */
            assert(req.query.id, 'id must be provided');

            /* making constant with title from the request's body */
            const id = req.query.id || '';

            /* delete advertisement with the given constant */
            Advertisement.findOne({_id: id})
                .then((advertisement) => {
                    if (advertisement !== null) {
                        console.log('-=-=-=-=-=-=-=-=-=-=- Deleting advertisement ' + advertisement.title + ' -=-=-=-=-=-=-=-=-=-=-');
                        Advertisement.deleteOne({ _id: id })
                            .then(() => res.status(200).json('advertisement deleted').end())
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('advertisement not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    deleteComment(req, res, next) {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- DELETE comment -=-=-=-=-=-=-=-=-=-=-=-=-=-');

        try {
            /* validation */
            assert(req.query.id, 'id must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const id = req.query.id || '';

            /* delete the comment with the given constants */
            Comment.findOne({_id: id})
                .then((comment) => {
                    if (comment !== null) {
                        Comment.updateOne({_id: id}, {content: '[deleted]'})
                            .then(() => res.status(200).json('comment deleted').end())
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('comment not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },

    deleteBid(req, res, next){
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- DELETE bid -=-=-=-=-=-=-=-=-=-=-=-=-=-');
        
        try{
            /* validation */
            assert(req.query.id, 'id must be provided');

            /* making constants with (new) title and (new) content from the request's body */
            const id = req.query.id || '';

            Bid.findOne({_id: id})
                .then((bid) => {
                    if (bid !== null) {
                        Bid.deleteOne({_id: id})
                            .then(() => res.status(200).json('bid deleted').end())
                            .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('bid not found', 404));
                    }
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 422))
        }
    },
};
