const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const studentSchema = new Schema({
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
        require: true
    },
    student: {
        type: String,
        require: true
        // unique: true
    },
    session: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    reg_no: {
        type: Number,
        require: true,
        unique: true
    },
    faculty: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    department: {
        type: String,
        // no trailing spaces before or after
        trim: true
    }
})


module.exports = mongoose.model('student', studentSchema);