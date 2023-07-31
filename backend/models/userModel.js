const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const usingSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
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
        require: true
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
    },
    password: {
        type: String,
    }
    // lecturer_field: {
    //     type: Schema.Types.ObjectId,
    //     ref: "lecturer"
    // },
    // student_field: {
    //     type: Schema.Types.ObjectId,
    //     ref: "lecturer"
    // },

})

module.exports = mongoose.model('using', usingSchema);