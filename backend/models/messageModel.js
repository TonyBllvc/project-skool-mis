const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    //  id of sender
    sender: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our message model
        ref: "using"
    }, 
    //  content of message
    content: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    // reference to which of the chats
    chat_owner: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "chatting" 
    }
}, { timestamps: true})

module.exports = mongoose.model('messaging', messageSchema);
