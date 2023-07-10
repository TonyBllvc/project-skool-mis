const Notice = require('../models/noticeModel')
const mongoose = require('mongoose');

// pass data about schools
const sets = async (req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { message,lecturerId, time, date, day } = req.body

    let emptyFields = []

    if (!message) {
        emptyFields.push('No message passed')
    }
    if (!lecturerId ){
        emptyFields.push('No lecturerId passed')
    }
    if (!time) {
        emptyFields.push('No time passed passed')
    }
    if (!date) {
        emptyFields.push('No date passed passed')
    }
    if (!day) {
        emptyFields.push('No date passed passed')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    var newNotice = {
        message,
        from: lecturerId,
        time,
        date,
        day
    }

    try {
        // to pass dat into the entire field
        var notice = await Notice.create(newNotice)

        notice = await notice.populate("from", " title surname first_name lecturer ")
        notice = await notice.populate("from")
        notice = await School.populate(notice, {
            path: "from.lecturer_details",
            select: "faculty department level semester",
        })


        res.status(200).json(notice)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// fetch timetable
const gets = async (req, res) => {

    try {

        const timeTable = await Notice.find({}).sort({ message: 1 }).populate("lecturer_details", "course_code course_name course_details level").sort({ course_name: 1 }).sort({ course_code: 1 })

        // a more comprehensive code to fetching every document embedded
        // would require me to first populate everything on every level
        // const timeTable = await Notice.find({}).sort({ message: 1 }).populate({
        //     path: "lecturer_details", 
        //     select: "course_code course_name level course_details",
        //     populate: {
        //         path: ' course_details',
        //         model: 'school'
        //     }
        // }).sort({ course_name: 1 }).sort({ course_code: 1 })




        res.status(200).json(timeTable)
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

    const result = await Notice.findById(id).populate("lecturer_details", "course_code course_name course_details level").sort({ course_name: 1 }).sort({ course_code: 1 })

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

const updates = async (req, res) => {
    const { id } = req.params
    const updatesNew = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        const result = await Notice.findByIdAndUpdate({ _id: id }, updatesNew, { new: true }).populate("lecturer_details", "course_code course_name course_details level")

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

    const result = await Notice.findByIdAndDelete({ _id: id })

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
