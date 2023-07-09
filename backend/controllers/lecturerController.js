const Lecturer = require('../models/lecturerModel')
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
    const { title, surname, first_name, lecturer } = req.body

    try {
        // pick up user and password(with hash) 
        const user = await Lecturer.create({title, surname, first_name, lecturer})


        // create a token
        // const token = createToken(user._id)

        res.status(200).json( user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getLecturers = async(req, res) => {
    const lecturer = await Lecturer.find({})
    // .populate("course_details", "faculty department level semester")


    res.status(200).json(lecturer)

}

const getLecturer = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const lecturer = await Lecturer.findById(id)

    if ( !lecturer) {
        return res.status(404).json({ error: 'No such lecturer' })
    }

    res.status(200).json(lecturer)

}
module.exports = { signupUser, loginUser, getLecturers, getLecturer }