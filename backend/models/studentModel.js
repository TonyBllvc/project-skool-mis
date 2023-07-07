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
    gender: {
        type: String,
        // unique: true
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
    student_details: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        ref: 'school'
        // unique: true
    },
    password: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model('student', studentSchema);