const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const schoolSchema = new Schema({
    faculty: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    department: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    level: {
        type: Number,
        // no trailing spaces before or after
        trim: true
    },
    semester: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
}, { timestamps: true})

module.exports = mongoose.model('school', schoolSchema);