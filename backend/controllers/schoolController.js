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
    // const schoolLevel = await School.findOne({ level })
    // const schoolSemester = await School.findOne({ semester })
    
    // if (schoolSemester && schoolLevel) {
    //     return res.status(400).json({ error: ' Please check that the semester or level is not repeated'})
    // }

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
    const schoolData = await School.find({}).sort({ level: 1 }).sort({ semester: 1})


    res.status(200).json(schoolData)
}

// get one school
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

// const search = aync(req, res) => {
//     const keyword = req.query.search ? {
//         $or: [
//             // in the 'options' property, 'i' means case sensitive
//             { name: { $regex: req.query.search, $options: 'i' } },
//             { email: { $regex: req.query.search, $options: 'i' } }
//         ]
//     } : {
//         // Do nothing!
//     }

//     const users = await School.find(keyword).find({ _id: { $ne: req.user._id } })

//     res.send(users)
    
// }

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