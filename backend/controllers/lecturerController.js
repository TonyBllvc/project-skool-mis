const Lecturer = require('../models/lecturerModel')
const School = require('../models/schoolModel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


// to crease a web token 
const createToken = (_id) => {

    // create a reuseable function
    // ( taking in three arguments. 
    //  1. the payload which is the {_id})
    // 2. the secret for just the server (stored on the '.env' file)
    // 3. any property -- this case, the expires property
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

// login user
const loginUser = async (req, res) => {
    // for logging in 
    const { email, password } = req.body

    try {
        // pick up user and password(with hash) 
        const user = await Lecturer.login(email, password)

        // create a token for already register user
        // to login
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// signup user
const signupUser = async (req, res) => {
    const { title, surname, first_name, lecturer, schoolId } = req.body

    var newData = {
        title,
        surname,
        first_name,
        lecturer,
        lecturer_details: schoolId
    }

    try {
        // pick up user and password(with hash) 
        var user = await Lecturer.create(newData)

        user = await user.populate("lecturer_details", "faculty department")

        // create a token
        // const token = createToken(user._id)

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// get all lecturers 
const getLecturers = async (req, res) => {
    const lecturer = await Lecturer.find({}).populate("lecturer_details", "faculty department").sort({ title: 1 }).sort({ surname: 1 })
    // .populate("user_details", "faculty department level semester")


    res.status(200).json(lecturer)

}
// pick selected lecturer
const getLecturer = async (req, res) => {
    const { schoolId } = req.params

    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const lecturer = await Lecturer.findById(schoolId).populate("lecturer_details", "faculty department").sort({ title: 1 }).sort({ surname: 1 })

    if (!lecturer) {
        return res.status(404).json({ error: 'No such lecturer' })
    }

    res.status(200).json(lecturer)

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

//         const { faculty } = school

//         const lecturers = await Lecturer.find({
//             "lecturer_details": faculty
//         }).populate("lecturer_details", "faculty department").sort({ title: 1 }).sort({ surname: 1 })

//         res.status(200).json({ lecturers })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }


// }
module.exports = { signupUser, loginUser, getLecturers, getLecturer,
    //  getDefinedLecturers
 }