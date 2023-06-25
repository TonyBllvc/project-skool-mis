const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const adminSchema = new Schema({
    title: {
        type: String,
        require: true,
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
    adviser: {
        type: String,
        // unique: true
    },

    department: {
        type: String,
        // unique: true
    },
    faculty: {
        type: String,
        // unique: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

        // to validate that is is an actual email
        // note I just added this based on research. It is not in the tutorial
        validate: (val) => {
            return validator.isEmail(val)
        }
    },
    password: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('administration', adminSchema);