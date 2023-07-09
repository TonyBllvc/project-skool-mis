const Student = require('../models/studentModel')
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
        const user = await Student.login(email, password)

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
    const { surname, first_name, middle_name, student, session, reg_no, faculty, department } = req.body

    try {
        // pick up user and password(with hash) 
        const user = await Student.create({
         surname, first_name, middle_name, student, session, reg_no, faculty, department
        })


        // create a token
        // const token = createToken(user._id)

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getStudents = async (req, res) => {
    const student = await Student.find({})
    // .populate("course_details", "faculty departme")


    res.status(200).json(student)

}

const getStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({ error: 'No such student' })
    }

    res.status(200).json(student)

}

module.exports = { signupUser, loginUser, getStudents, getStudent }