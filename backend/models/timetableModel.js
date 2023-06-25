const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const timetableSchema = new Schema({
    day: {
        type: String,
        require: true,
        // unique: true
    },
    start: {
        type: String,
        require: true,
        // unique: true
    },
    end: {
        type: String,
        require: true,
        // unique: true
    },
    course_code: {
        type: String,
        // unique: true
    },
    course_name: {
        type: String,
        // unique: true
    },
})

module.exports = mongoose.model('timetable', timetableSchema);