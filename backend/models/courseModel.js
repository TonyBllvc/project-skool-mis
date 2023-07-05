const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const courseSchema = new Schema({
    course_code: {
        type: String,
        require: true,
        unique: true
    },
    course_name: {
        type: String,
        require: true,
        unique: true
    },
    course_coordinator: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "lecturer",
        unique: true
    },
    // reference to owner of chat
    course_lecturers: [{
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "lecturer", 
        require: true
    }],
    course_details: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "school", 
        unique: true
    },
}, { timestamps: true})

module.exports = mongoose.model('course', courseSchema);