const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const adminSchema = new Schema({
    faculty: {
        type: String,
        require: true,
        // unique: true
    },
    department: {
        type: String,
        require: true,
        // unique: true
    },

    level: {
        type: String,
        require: true,
        // unique: true
    },
    session: {
        type: String,
        // unique: true
    },
    semester: {
        type: String,
        // unique: true
    },
})

module.exports = mongoose.model('administration', adminSchema);