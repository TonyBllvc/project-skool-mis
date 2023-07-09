const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Create schema and model
const courseSchema = new Schema({
    course_code: {
        type: String,
        trim: true,
    },
    course_name: {
        type: String,
        trim: true,
    },
    level: {
        type: String,
        trim: true
    },
    // course_coordinator: {
    //     // containing the id to a particular user
    //     type: Schema.Types.ObjectId,
    //     // reference to our user model
    //     ref: "lecture",
    // },
    // course_lecturers: [{
    //     // containing the id to a particular user
    //     type: Schema.Types.ObjectId,
    //     // reference to our user model
    //     ref: "lecture",
    // }],
    course_details: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "school",
    },
}, { timestamps: true })

module.exports = mongoose.model('course', courseSchema);