const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Keep on pending
// Create schema and model
const timetableSchema = new Schema({
    day: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    start: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    end: {
        type: String,
        // no trailing spaces before or after
        trim: true
    },
    
    // reference to course
    time_details: {
        // containing the id to a particular user
        type: Schema.Types.ObjectId,
        // reference to our user model
        ref: "course" 
    }
})

module.exports = mongoose.model('timetable', timetableSchema);