const Result = require('../models/resultModel')
const mongoose = require('mongoose');

// pass data about schools
const sets = async (req, res) => {
    // remember to add the coordinator's user id and lecturer's id ..
    // ... which, in the frontend pass in a drop down through mapping
    // then pick id
    const { test, exam, practical } = req.body

    let emptyFields = []

    if (!test) {
        emptyFields.push('No test score passed')
    }
    if (!exam) {
        emptyFields.push('No exam score passed')
    }
    if (!practical) {
        emptyFields.push('No practical score passed')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    const sum_up = parseFloat(test) + parseFloat(practical) + parseFloat(exam)
    const sumUp = parseInt(sum_up)

    if (sum_up > 100) {
        return res.status(400).json({ error: " Score must be below 100%" })
    } else {
        const grade = sumUp  
        const resultTotal = {
            test, exam, practical, grade
        }
    
        try {
    
            var result = await Result.create(resultTotal)
    
            // result = await result.populate("course_details", "faculty department level semester")
    
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    
    }

  
}

// fetch all schools
const gets = async (req, res) => {

    const courseData = await Course.find({}).populate("course_details", "faculty department level semester").sort({ test: 1 }).sort({ exam: 1 })


    res.status(200).json(courseData)

}


const get = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Course.findById(id).populate("course_details", "faculty department level semester")

    if (!result) {
        return res.status(404).json({ error: 'No such result' })
    }

    res.status(200).json(result)

}

const updates = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const result = await Course.findByIdAndUpdate({ _id: id }, {
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
    updates,
    deletes
}
