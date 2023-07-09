const Result = require('../models/resultModel')
const School = require('../models/schoolModel')
const mongoose = require('mongoose');

// pass data about schools 
const sets = async (req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { student_id, test, exam, practical, grade, remark, courseId } = req.body

    let emptyFields = []

    if (!student_id) {
        emptyFields.push('No student id allocated')
    }
    if (!test) {
        emptyFields.push('No test score passed')
    }
    if (!exam) {
        emptyFields.push('No exam score passed')
    }
    if (!practical) {
        emptyFields.push('No practical score passed')
    }
    if (!grade) {
        emptyFields.push('No result id allocated')
    }
    if (!remark) {
        emptyFields.push('No result id allocated')
    }
    if (!courseId) {
        emptyFields.push('No result id allocated')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }


    const sum_up = parseFloat(test) + parseFloat(practical) + parseFloat(exam)
    const sumUp = sum_up.toFixed(2) // for the score in (%)

    if (sumUp > 100) {
        return res.status(400).json({ error: " Score must be below 100%" })
    }

    const resultTotal = {
        student_id, test, exam, practical, score: sumUp, grade, remark, result_details: courseId
    }

    try {

        var result = await Result.create(resultTotal)

        result = await result.populate("student_id", "surname first_name middle_name student session reg_no faculty department ")

        result = await result.populate("result_details", "course_code course_name level")
        result = await result.populate("result_details")
        result = await School.populate(result, {
            path: "result_details.course_details",
            select: "faculty department level semester",
        })

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


// fetch all results
const gets = async (req, res) => {

    const courseData = await Result.find({}).populate({
        path: 'student_id',
        select: 'surname first_name middle_name student session reg_no faculty department',
        // option: { sort: { surname: 1 } }
    }).populate({
        path: 'result_details',
        select: 'course_code course_name level course_details',
    }).collation({ locale: 'en', strength: 1}).sort({ 'student_id.surname': 1}).exec()
    // .populate("course_details", "faculty department level semester")


    res.status(200).json(courseData)

}


const get = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Result.findById(id)
    // .populate("course_details", "faculty department level semester")

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

const getStudent = async (req, res) => {
    // const { student_id } = req.params
    const { student_id } = req.params

    // if (!mongoose.Types.ObjectId.isValid(student_id)) {
    //     return res.status(404).json({ error: 'No such document' })
    // }

    const result = await Result.find({ student_id }).populate({
        path: 'student_id',
        select: 'surname first_name middle_name student session reg_no faculty department',
        // option: { sort: { surname: 1 } }
    }).populate({
        path: 'result_details',
        select: 'course_code course_name level course_details',
    }).collation({ locale: 'en', strength: 1}).sort({ 'student_id.surname': 1}).exec()
    // .populate("course_details", "faculty department level semester")

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }
    // const results = result.student_id

    res.status(200).json(result)

}

const updates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Result.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!result) {
        return res.status(400).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

const deletes = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Course.findByIdAndDelete({ _id: id })

    if (!result) {
        return res.status(400).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

module.exports = {
    sets,
    gets,
    get,
    getStudent,
    updates,
    deletes
}
