const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chat_name: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    // if the chat is a group chat or not
    isGroupChat: {
        type: Boolean,
        default: false
    },
    // users for chats is more than one, so we need an array
    users: [{
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "using"
    }],

    // to keep track of latest messages
    latestMessage: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our message model
        ref: "message"
    },
    groupAdmin: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our message model
        ref: "lecturer"

    }
}, { timestamps: true })


module.exports = mongoose.model("chat", chatSchema);