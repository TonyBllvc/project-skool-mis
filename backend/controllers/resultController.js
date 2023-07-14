const Result = require('../models/resultModel')
const School = require('../models/schoolModel')
const Student = require('../models/studentModel')
const mongoose = require('mongoose');

// Create another create student's result schema with this
// const create = async(req, res) => {

// }

// incomplete (work in the frontend(pass algorithm))
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
        return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
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
        // const resultStudent = await Result.find({ student_id: student_id })
        // const resultDetails = await Result.find({ result_details: courseId })

        // if( resultDetails && resultStudent){
        //     return res.status(400).json({ error: 'Data already exists!'})
        // }

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


// fully operational
// fetch all results
const gets = async (req, res) => {

    const courseData = await Result.find({}).populate({
        path: 'student_id',
        select: 'surname first_name middle_name student session reg_no faculty department',
        // option: { sort: { surname: 1 } }
    }).populate({
        path: 'result_details',
        select: 'course_code course_name level course_details',
        populate: {
            path: 'course_details',
            model: 'school',
            // select: 'faculty department level semester'
        }
    }).collation({ locale: 'en', strength: 1 }).sort({ 'student_id.surname': 1 }).exec()
    // .populate("course_details", "faculty department level semester")


    res.status(200).json(courseData)

}


// fully operational
// gets result's based on clicked (provided id)
const get = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Result.findById(id).populate({
        path: 'student_id',
        select: 'surname first_name middle_name student session reg_no faculty department',
        // option: { sort: { surname: 1 } }
    }).populate({
        path: 'result_details',
        select: 'course_code course_name level course_details',
        populate: {
            path: 'course_details',
            model: 'school',
            // select: 'faculty department level semester'

        }
    }).collation({ locale: 'en', strength: 1 }).sort({ 'student_id.surname': 1 }).exec()
    // .populate("course_details", "faculty department level semester")

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

// fully operational
// gets specific student result
const getStudent = async (req, res) => {
    // pass student id
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
        populate: {
            path: 'course_details',
            model: 'school',
            // select: 'faculty department level semester'

        }
    }).collation({ locale: 'en', strength: 1 }).sort({ 'student_id.surname': 1 }).sort({"result_details.level": 1}).exec()
    // .populate("course_details", "faculty department level semester")

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }
    // const results = result.student_id

    res.status(200).json(result)

}

const getResultsForSession = async (req, res) => {
    const { session, course_id } = req.params

    try {
        const results = await Result.find({ session: session, result_details: course_id }).populate({
            path: 'student_id',
            select: 'surname first_name middle_name student session reg_no faculty department',
            // option: { sort: { surname: 1 } }
        }).populate({
            path: 'result_details',
            select: 'course_code course_name level course_details',
            populate: {
                path: 'course_details',
                model: 'school',
                // select: 'faculty department level semester'
    
            }
        }).collation({ locale: 'en', strength: 1 }).sort({ 'student_id.surname': 1 }).sort({ first_name: 1 }).exec()
        // check if students actually exists
        if (!results) {
            return res.status(404).json({ error: 'No such students' })
        }

        // pass students's results
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ error: error.message + " h" })

    }
}

const getResultsForUserForSession = async (req, res) => {
    const { course_id, student_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(404).json({ error: 'No such course' })
    }

    if (!mongoose.Types.ObjectId.isValid(student_id)) {
        return res.status(404).json({ error: 'No such student' })
    }
    try {
        const results = await Result.find({ course_details: course_id, student_id: student_id }).populate({
            path: 'student_id',
            select: 'surname first_name middle_name student session reg_no faculty department',
            // option: { sort: { surname: 1 } }
        }).populate({
            path: 'result_details',
            select: 'course_code course_name level course_details',
            populate: {
                path: 'course_details',
                model: 'school',
                // select: 'faculty department level semester'
    
            }
        }).collation({ locale: 'en', strength: 1 }).sort({ 'student_id.surname': 1 }).sort({ first_name: 1 }).exec()
        // check if students actually exists
        if (!results) {
            return res.status(404).json({ error: 'No such students' })
        }

        // pass students's results
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ error: error.message + " h" })

    }

}


// function is not functioning
const searchResult = async (req, res) => {
    const { search } = req.query ? {
        $or: [
            // in the 'options' property, 'i' means case sensitive
            { surname: { $regex: search, $options: 'i' } },
            { first_name: { $regex: search, $options: 'i' } },
            { middle_name: { $regex: search, $options: 'i' } },
            { reg_no: { $regex: search, $options: 'i' } }
        ]
    } : {

    }

    try {
        const user = await Student.find(search).filter((user) => user._id !== null)


        res.status(200).json(user)
    } catch (error) {

    }
    // const keyword = req.query ? {
    //     $or: [
    //         // in the 'options' property, 'i' means case sensitive
    //         { surname: { $regex: req.query, $options: 'i' } },
    //         { first_name: { $regex: req.query, $options: 'i' } },
    //         { middle_name: { $regex: req.query, $options: 'i' } },
    //         { reg_no: { $regex: req.query, $options: 'i' } }
    //     ]
    // } : {
    //     // Do nothing!
    // }

    // make ure to add thi, to prevent searching for the user logged in
    // find({ _id: { $ne: req.user._id } })
    // try {
    //     const users = await Result.find().populate({
    //         path: 'student_id',
    //         match: {
    //             $or: [
    //                 // in the 'options' property, 'i' means case insensitive
    //                 { 'student_id.surname': { $regex: search, $options: 'i' } },
    //                 { 'student_id.first_name': { $regex: search, $options: 'i' } },
    //                 { 'student_id.middle_name': { $regex: search, $options: 'i' } },
    //                 { 'student_id.reg_no': search }
    //             ]
    //         }
    //     }).exec()

    //     const filtered = users.filter((user) => user.student_id !== null)
    //     res.status(200).json( filtered)
    // } catch (error) {
    //     res.status(404).json({ error: 'Can not process' })
    // }

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

    const result = await Result.findByIdAndDelete({ _id: id })

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
    searchResult,
    getResultsForSession,
    getResultsForUserForSession,
    updates,
    deletes
}
