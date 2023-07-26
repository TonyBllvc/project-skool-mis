const Time = require('../models/timetableModel')
const School = require('../models/schoolModel')
const mongoose = require('mongoose');

// pass data about schools
const sets = async (req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { day, start, am_one, am_two, end, courseId } = req.body

    let emptyFields = []

    if (!day) {
        emptyFields.push('No day passed')
    }
    if (!start) {
        emptyFields.push('No start time passed')
    }
    if (!am_one) {
        emptyFields.push('No stoppage time passed passed')
    }
    if (!end) {
        emptyFields.push('No stoppage time passed passed')
    }
    if (!am_two) {
        emptyFields.push('No stoppage time passed passed')
    }
    if (!courseId) {
        emptyFields.push('No course passed')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    var newTimeTable = {
        day,
        start,
        end,
        am_one,
        am_two,
        time_details: courseId
    }

    try {
        // to pass dat into the entire field
        var course = await Time.create(newTimeTable)

        course = await course.populate("time_details", "course_code course_name level")
        course = await course.populate("time_details")
        course = await School.populate(course, {
            path: "time_details.course_coordinator",
            select: " title surname first_name middle_name faculty department phone email",
        })
        course = await School.populate(course, {
            path: "time_details.course_lecturers",
            select: " title surname first_name middle_name faculty department phone email",
        })
        course = await School.populate(course, {
            path: "time_details.course_details",
            select: "faculty department level semester",
        })


        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// fetch timetable
const gets = async (req, res) => {

    try {

        // const timeTable = await Time.find({}).populate("time_details", "course_code course_name level course_details").sort({ day: 1}).sort({ course_code: 1 })


        const timeTable = await Time.find({}).populate("time_details", "course_code course_name level course_details").sort({ start: 1 }).lean()

        const sortData = timeTable.sort((a, b) => {

            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            return days.indexOf(a.day) - days.indexOf(b.day)
        })

        // a more comprehensive code to fetching every document embedded
        // would require me to first populate everything on every level
        // const timeTable = await Time.find({}).sort({ day: 1 }).populate({
        //     path: "time_details", 
        //     select: "course_code course_name level course_details",
        //     populate: {
        //         path: ' course_details',
        //         model: 'school'
        //     }
        // }).sort({ course_name: 1 }).sort({ course_code: 1 })

        res.status(200).json(sortData)
    } catch (error) {
        return res.status(400).json({ error: 'No such timetable' })
    }

}

// find timetable by id
const get = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Time.findById(id).sort({ day: 1 }).populate("time_details", "course_code course_name course_details level").sort({ course_name: 1 }).sort({ course_code: 1 })

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

const updates = async (req, res) => {
    // const { id } = req.params
    const { id, day, start, am_one, am_two, end, courseId } = req.body
    // const updatesNew = {  }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        const result = await Time.findByIdAndUpdate(
            id,
            {
                day, start, am_one, am_two, end, time_details: courseId
            },
            {
                new: true
            }).populate("time_details", "course_code course_name course_details level")

        if (!result) {
            return res.status(404).json({ error: 'No such result' })
        }

        res.status(200).json(result)
    } catch (error) {
        return res.status.json({ error: "An error occurred, sorry!" })
    }
}

const deletes = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Time.findByIdAndDelete({ _id: id })

    if (!result) {
        return res.status(400).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

module.exports = {
    sets,
    gets,
    get,
    updates,
    deletes
}
