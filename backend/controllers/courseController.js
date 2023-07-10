const Course = require('../models/courseModel')
const mongoose = require('mongoose');

// pass data about schools
const sets = async(req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { course_code, course_name, level, schoolId, lecturer_id, lecturers_id } = req.body
    
    let emptyFields = []

    // check for any emp[ty fields
    if (!course_code) {
        emptyFields.push('course code')
    }
    if (!course_name) {
        emptyFields.push('course name')
    }
    if (!level) {
        emptyFields.push('course name')
    }
    if (!schoolId) {
        emptyFields.push('No course details passed')
    }
    if (!lecturer_id) {
        emptyFields.push('No lecturer_id details passed')
    }
    if (!lecturers_id) {
        emptyFields.push('No lecturers_id details passed')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    
    // to check if these two fields already exists 
    // return error
    const courseCode = await Course.findOne({ course_code })
    const courseName = await Course.findOne({ course_name })
    
    if (courseCode) {
        return res.status(400).json({ error: ' Course Code already exists'})
    }
    if (courseName) {
        return res.status(400).json({ error: ' Course Name already exists'})
    }

    // pass in values
    var newCourse = {
        course_code, 
        course_name,  
        level,
        course_coordinator: lecturer_id,
        course_lecturers: lecturers_id,
        course_details: schoolId 
    }

    // run 
    try {

        var course = await Course.create(newCourse)

        course = await course.populate("course_details", "faculty department level semester")
        course = await course.populate("course_coordinator", "title surname first_name lecturer")
        course = await course.populate("course_lecturers", "title surname first_name lecturer")

        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// fetch all schools
const gets = async(req, res) => {

    const courseData = await Course.find({}).populate("course_details", "faculty department level semester").sort({course_code: 1}).sort({course_name: 1}).populate("course_coordinator", "title surname first_name lecturer").sort({ title: 1}).sort({ surname: 1}).populate("course_lecturers", "title surname first_name lecturer").sort({ title: 1}).sort({ surname: 1})


    res.status(200).json(courseData)
    
}


const get = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const course = await Course.findById(id).populate("course_details", "faculty department level semester").populate("course_coordinator", "title surname first_name lecturer").sort({ title: 1}).sort({ surname: 1}).populate("course_lecturers", "title surname first_name lecturer").sort({ title: 1}).sort({ surname: 1})

    if (!course) {
        return res.status(404).json({ error: 'No such course' })
    }

    res.status(200).json(course)

}

const updates = async(req, res) => {
    const { id } = req.params
    const updatesNew = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const course = await Course.findByIdAndUpdate({ _id: id }, updatesNew, { new: false }).populate("course_details", " faculty department level semester").populate("course_coordinator", "title surname first_name lecturer").sort({ title: 1}).sort({ surname: 1}).populate("course_lecturers", "title surname first_name lecturer").sort({ title: 1}).sort({ surname: 1})

    if (!course) {
        return res.status(400).json({ error: 'No such course' })
    }

    res.status(200).json(course)

}

const deletes = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const course = await Course.findByIdAndDelete({ _id: id })

    if (!course) {
        return res.status(400).json({ error: 'No such course' })
    }

    res.status(200).json(course)

}

module.exports = { 
    sets,
    gets,
    get,
    updates,
    deletes
}
