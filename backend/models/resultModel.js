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
        // no trailing spaces before or after
        trim: true
    },
    exam: {
        type: Number,
        // no trailing spaces before or after
        trim: true
    },
    practical: {
        type: Number,
        // no trailing spaces before or after
        trim: true
    },
    score: {
        type: Number,
        // no trailing spaces before or after
        trim: true
    },
    grade: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    remark: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    result_details: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
}, { timestamps: true })

module.exports = mongoose.model('result', resultSchema);