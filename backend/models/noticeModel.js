const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const noticeSchema = new Schema({
    message: {
        type: String,
        require: true,
        // unique: true
    },
    from: {
        type: String,
        require: true,
        // unique: true
    },
    time: {
        type: String,
        require: true,
        // unique: true
    }
})

module.exports = mongoose.model('notice', noticeSchema);