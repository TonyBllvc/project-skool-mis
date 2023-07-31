const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const usingSchema = new Schema({
    title: {
        type: String,
        // require: true,
        // unique: true
    },
    surname: {
        type: String,
        require: true,
        // unique: true
    },
    first_name: {
        type: String,
        require: true,
        // unique: true
    },
    middle_name: {
        type: String,
        // unique: true
    },
    role: {
        type: String,
    },
    faculty: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    reg_no: {
        type: Number,
        unique: true
    },
    department: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('using', usingSchema);