const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('users');

const StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        default: false
    },
    Comments: [{
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            required: Date.now
        },
        commentUser: {
            type: Schema.Types.ObjectId,
            ref: User
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    date: {
        type: Date,
        required: Date.now
    }
})

// Create collection and add Schema
mongoose.model('stories', StorySchema, "stories")