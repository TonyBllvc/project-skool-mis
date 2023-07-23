const Notice = require('../models/noticeModel')
const School = require('../models/schoolModel')
const mongoose = require('mongoose');

// pass data about schools
const sets = async (req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { message, lecturerId, form } = req.body

    let emptyFields = []

    if (!message) {
        emptyFields.push('No message passed')
    }
    if (!lecturerId) {
        emptyFields.push('No lecturerId passed')
    }
    // if (!time) {
    //     emptyFields.push('No time passed passed')
    // }
    if (!form) {
        emptyFields.push('No form passed passed')
    }
    // if (!date) {
    //     emptyFields.push('No date passed passed')
    // }
    // if (!day) {
    //     emptyFields.push('No date passed passed')
    // }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    var newNotice = {
        message,
        from: lecturerId,
        // time,
        form,
        // date,
        // day
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
        const notice = await Notice.find({}).populate({
            path: "from",
            select: "title surname first_name "
        })

        res.status(200).json(notice)
    } catch (error) {
        return res.status(400).json({ error: 'No such notice' })
    }

}

// find timetable by id
const get = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const notice = await Notice.findById(id).populate({
        path: "from",
        select: "title surname first_name "
    })

    if (!notice) {
        return res.status(404).json({ error: 'No such notice' })
    }

    res.status(200).json(notice)
}

const getByLecturer = async (req, res) => {
    // pass student id
    const { lecturer_id } = req.params

    const result = await Notice.find({ from: lecturer_id }).populate({
        path: 'from',
        select: 'title surname first_name ',
        // option: { sort: { surname: 1 } }
    }).exec()
    // .populate("course_details", "faculty department level semester")

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }
    // const results = result.lecturer_id

    res.status(200).json(result)


}

const updates = async (req, res) => {
    const { id, message, lecturerId, form, time, date, day } = req.body
    // const updatesNew = {  }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        const notice = await Notice.findByIdAndUpdate(
            id,
            {
                day, message, form, time, date, from: lecturerId
            },
            {
                new: true
            }).populate({
                path: "from",
                select: "title surname first_name "
            })

        if (!notice) {
            return res.status(404).json({ error: 'No such notice' })
        }

        res.status(200).json(notice)
    } catch (error) {
        return res.status.json({ error: "An error occurred, sorry!" })
    }

}

const deletes = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const notice = await Notice.findByIdAndDelete({ _id: id })

    if (!notice) {
        return res.status(400).json({ error: 'No such notice' })
    }

    res.status(200).json(notice)

}

module.exports = {
    sets,
    gets,
    get,
    getByLecturer,
    updates,
    deletes
}
