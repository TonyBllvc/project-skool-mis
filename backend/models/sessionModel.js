const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const sessionSchema = new Schema({
    session: {
        type: String,
        unique: true,
        // no trailing spaces before or after
        trim: true
    },

})


module.exports = mongoose.model('session', sessionSchema);