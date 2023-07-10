const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const noticeSchema = new Schema({
    message: {
        type: String,
        require: true,
        // unique: true
    },
    from: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "lecturer" 
    
    },
    time: {
        type: String,
        require: true,
        // unique: true
    },
    date: {
        type: String,
        require: true,
        // unique: true
    },
    date: {
        type: String,
        require: true,
        // unique: true
    }
}, { timestamps: true })

module.exports = mongoose.model('notice', noticeSchema);