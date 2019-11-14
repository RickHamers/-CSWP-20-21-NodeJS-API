// Rick Hamers - 2019-11-14 14:15
//advertisement.js - provide a model for an advertisement

/* Requiring the necessary libraries and assets */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Creating the advertisement Schema */
const AdvertisementSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
    }]
});

/* Creating the comment Schema */
const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    advertisementId: {
        type: String,
        required:  true
    },
    username: {
        type: String,
        required: true
    },
    upVote:[{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    downVote:[{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

/* Auto populate comments */
function autoPopulateComments(next){
    this.populate('comments');
    next()
}

AdvertisementSchema
    .pre('findOne', autoPopulateComments)
    .pre('find', autoPopulateComments);

CommentSchema
    .pre('findOne', autoPopulateComments)
    .pre('find', autoPopulateComments);

/* Creating the comment model */
const Comment = mongoose.model('comment', CommentSchema);

/* Creating the advertisement model */
const Advertisement = mongoose.model('advertisement', AdvertisementSchema);

/* Exporting User to be used elsewhere in the project */
module.exports = {adverisement: Advertisement, comment: Comment};