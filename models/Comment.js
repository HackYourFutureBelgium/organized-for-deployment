const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = require('./User');
const SchoolModel = require('./School');

const CommentsSchema = new Schema({

    schoolid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchoolModel,
        required: true
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },

    body: {
        type: String,
        required: [true, 'Comment body is required'],
        minlenght: 1,
        maxlength: 300
    },

    created: {
        type: Date,
        default: Date.now()
    }
})
const Comment = mongoose.model('Comment', CommentsSchema);
module.exports = Comment;