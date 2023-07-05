const Course = require('../models/courseModel')
const mongoose = require('mongoose');

const sets = async(req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { course_code, course_name, schoolId } = req.body

    var newCourse = {
        course_code, 
        course_name,  
        course_details: schoolId 
    }

    try {

        var course = await Course.create(newCourse)

        course = await course.populate("course_details", "faculty department level semester")

        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const updates = async(req, res) => {
    // const { courseId } = req.course._id

    // if(!courseId){
    //     return res.status(400).json({error: 'no such id'})
    // }
    
    // res.status(200).json(courseId)

}

const deletes = async(req, res) => {

}

module.exports = { 
    sets,
    updates,
    deletes
}
