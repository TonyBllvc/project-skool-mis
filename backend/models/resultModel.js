const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const resultSchema = new Schema({
    student_id: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our message model
        ref: "student"
    },
    test: {
        type: Number,
        require: true,
        // unique: true
    },
    exam: {
        type: Number,
        require: true,
        // unique: true
    },
    grade: {
        type: Number,
        require: true,
        // unique: true
    },
    course: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('result', resultSchema);