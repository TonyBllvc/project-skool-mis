const School = require('../models/schoolModel')
const mongoose = require('mongoose');

const create = async (req, res) => {
    const { faculty, department, level, semester } = req.body

    let emptyFields = []

    if (!faculty) {
        emptyFields.push('faculty')
    }
    if (!department) {
        emptyFields.push('department')
    }
    if (!level) {
        emptyFields.push('level')
    }
    if (!semester) {
        emptyFields.push('semester')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // check if this level already exists
    const schoolLevel = await School.findOne({ level })
    
    if (schoolLevel) {
        return res.status(400).json({ error: ' Level already exists'})
    }

    // add doc to db
    try {

        const school = await School.create({
            faculty, department, level, semester
        })

        res.status(200).json(school)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// fetch all schools based on(faculty)
const gets = async (req, res) => {

    const schoolData = await School.find({}).sort({ createAt: -1 })


    res.status(200).json(schoolData)
}

const get = async( req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const schoolData = await School.findById(id)

    if (!schoolData) {
        return res.status(404).json({ error: 'No such schoolData' })
    }

    res.status(200).json(schoolData)

}

const updating = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const school = await School.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!school) {
        return res.status(400).json({ error: 'No such school' })
    }

    res.status(200).json(school)

}

const deleting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const schoolData = await School.findByIdAndDelete({ _id: id })

    if (!schoolData) {
        return res.status(400).json({ error: 'No such schoolData' })
    }

    res.status(200).json(schoolData)
}

module.exports = {
    create,
    gets,
    get,
    updating,
    deleting
}