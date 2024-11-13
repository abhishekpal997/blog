const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
    },

    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    reply: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    createAt: {
        type: Date,
        default: Date.now,
    }

})

const commmentModel = mongoose.model('Comment', commentSchema);

module.exports = commmentModel;