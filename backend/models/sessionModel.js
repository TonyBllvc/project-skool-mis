const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const courseSchema = new Schema({
    course_code: {
        type: String,
        require: true,
        // unique: true
    },
    course_name: {
        type: String,
        require: true,
        // unique: true
    },
    course_coordinator: {
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

module.exports = mongoose.model('course', courseSchema);