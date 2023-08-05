const Lecturer = require('../models/lecturerModel')
const School = require('../models/schoolModel')
const User = require('../models/userModel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

// to crease a web token 
const createToken = (_id, role) => {

    // create a reuseable function
    // ( taking in three arguments. 
    //  1. the payload which is the {_id})
    // 2. the secret for just the server (stored on the '.env' file)
    // 3. any property -- this case, the expires property
    return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '1d' })
}

// signup lecturer
const signupLecturer = async (req, res) => {
    const { title, surname, first_name, middle_name, role, faculty, department, phone, email, password } = req.body

    let emptyFields = []

    if (!surname) {
        emptyFields.push('No surname allocated')
    }
    if (!first_name) {
        emptyFields.push('No first name score passed')
    }
    if (!role) {
        emptyFields.push('No lecturer score passed')
    }
    if (!faculty) {
        emptyFields.push('No schoolId score passed')
    }
    if (!department) {
        emptyFields.push('No schoolId score passed')
    }
    if (!phone) {
        emptyFields.push('No phone number allocated')
    }
    if (!email) {
        emptyFields.push('No email allocated')
    }
    if (!phone) {
        emptyFields.push('No phone number allocated')
    }
    if (emptyFields.length > 0) {
        return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // var newData = {
    //     title,
    //     surname,
    //     first_name,
    //     middle_name,
    //     lecturer,
    //     lecturer_details: schoolId,
    //     phone,
    //     email,
    //     password
    // }

    try {
        // pick up lecturer and password(with hash) 
        var lecturer = await Lecturer.signup(title, surname, first_name, middle_name, role, faculty, department, phone, email, password)
        // .populate("lecturer_details", "phone schoolId")

        // lecturer = await lecturer.populate("lecturer_details", "phone schoolId")

        // create a token
        const token = createToken(lecturer._id, lecturer.role)

        res.status(200).json({ title, surname, first_name, middle_name, role, faculty, department, phone, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    const emailExists = await User.findOne({ email })

    if (emailExists) {
        return
    }

    try {
        await User.create({ _id: lecturer._id, title, surname, first_name, middle_name, role, department, faculty, phone, email })


    } catch (error) {
        return res.status(404).json({ error: error.message })
    }

}

// login lecturer
const loginLecturer = async (req, res) => {
    // for logging in 
    const { email, role, password } = req.body

    try {
        // pick up lecturer and password(with hash) 
        const lecturer = await Lecturer.login(email, role, password)

        // create a token for already register lecturer
        // to login
        const token = createToken(lecturer._id, lecturer.role)

        const userData = {
            email,
            role,
            token,
            _id: lecturer._id,
            surname: lecturer.surname,
            first_name: lecturer.first_name,
            middle_name: lecturer.middle_name,
            phone: lecturer.phone
        }

        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


// get all lecturers 
const getLecturers = async (req, res) => {
    const lecturer = await Lecturer.find({}).sort({ title: 1 }).sort({ surname: 1 })
    // .populate("user_details", "phone schoolId level semester")


    res.status(200).json(lecturer)

}
// pick selected lecturer
const getLecturerProfile = async (req, res) => {
    // const { schoolId } = req.params

    // if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    //     return res.status(404).json({ error: 'No such document' })
    // }

    const { email } = req.params

    const lecturer = await Lecturer.findOne({ email: email })

    // check if students actually exists
    if (!lecturer) {
        return res.status(404).json({ error: 'No such lecturer' })
    }

    res.status(200).json(lecturer)

}

const searchLecturer = async (req, res) => {
    try {

        const keyword = req.query.search ? {
            $or: [
                // in the 'options' property, 'i' means case sensitive
                { surname: { $regex: req.query.search, $options: 'i' } },
                { title: { $regex: req.query.search, $options: 'i' } },
                { first_name: { $regex: req.query.search, $options: 'i' } },
                { middle_name: { $regex: req.query.search, $options: 'i' } }
            ]
        } : {
            // Do nothing!
        }

        const users = await Lecturer.find(keyword)

        res.status(200).json(users)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

// const getDefinedLecturers = async (req, res) => {
//     const { schoolId } = req.params


//     try {
//         if (!mongoose.Types.ObjectId.isValid(schoolId)) {
//             return res.status(404).json({ error: 'No such document' })
//         }

//         // check if school exists 
//         const school = await School.findById(schoolId)

//         if (!school) {
//             return res.status(404).json({ error: 'No such school' })
//         }

//         const { phone } = school

//         const lecturers = await Lecturer.find({
//             "lecturer_details": phone
//         }).populate("lecturer_details", "phone schoolId").sort({ title: 1 }).sort({ surname: 1 })

//         res.status(200).json({ lecturers })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }


// }
module.exports = {
    signupLecturer, loginLecturer, getLecturers, getLecturerProfile, searchLecturer
    //  getDefinedLecturers
}