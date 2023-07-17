const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const lecturerSchema = new Schema({
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
    lecturer: {
        type: String,
        enum: 'lecturer',
        // unique: true
    },
    lecturer_details: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        ref: 'school'
        // unique: true
    },
    // phone: {
    //     type: Number,
    //     require: true,
    //     unique: true
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,

    //     // to validate that is is an actual email
    //     // note I just added this based on research. It is not in the tutorial
    //     validate: (val) => {
    //         return validator.isEmail(val)
    //     }
    // },
    // password: {
    //     type: String,
    //     require: true
    // },
})

module.exports = mongoose.model('lecturer', lecturerSchema);