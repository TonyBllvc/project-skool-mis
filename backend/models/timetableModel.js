const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Keep on pending
// Create schema and model
const timetableSchema = new Schema({
    day: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        // no trailing spaces before or after
        trim: true
    },
    start: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    // am_one: {
    //     type: String,
    //     trim: true
    // },
    end: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    // am_two: {
    //     type: String,
    //     trim: true
    // },

    // reference to course
    time_details: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "course"
    }
})

module.exports = mongoose.model('timetable', timetableSchema);