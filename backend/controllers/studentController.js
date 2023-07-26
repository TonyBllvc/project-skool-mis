const Student = require('../models/studentModel')
const Session = require('../models/sessionModel')
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

// signup student
const signupStudent = async (req, res) => {
    const { surname, first_name, middle_name, student_status, session, reg_no, department, faculty, phone, email, password } = req.body

    let emptyFields = []

    if (!surname) {
        emptyFields.push('No surname allocated')
    }
    if (!first_name) {
        emptyFields.push('No first name passed')
    }
    if (!student_status) {
        emptyFields.push('No student status passed')
    }
    if (!reg_no) {
        emptyFields.push('No reg no passed')
    }
    if (!department) {
        emptyFields.push('No department passed')
    }
    if (!faculty) {
        emptyFields.push('No faculty id allocated')
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


    const regExists = await Student.findOne({ reg_no })
    if (regExists) {
        return res.status(404).json({ error: 'Reg no already exits' })
    }

    try {
        // pick up student and password(with hash) 
        const student = await Student.signup(
            surname, first_name, middle_name, student_status, session, reg_no, department, faculty, phone, email, password
        )


        // create a token
        const token = createToken(student._id)

        res.status(200).json({ surname, first_name, middle_name, student_status, session, reg_no, department, faculty, phone, email, token })

    } catch (error) {
       return  res.status(400).json({ error: error.message })
    }

    // to create session
    const sessionExists = await Session.findOne({ session })
    if (sessionExists) {
        return
    }

    try {

        await Session.create({
            session
        })
    } catch (error) {
        return res.status(404).json({ error: error.message })

    }

}

// login student
const loginStudent = async (req, res) => {
    // for logging in 
    const { reg_no, password } = req.body

    try {
        // pick up student and password(with hash) 
        const student = await Student.login(reg_no, password)

        // create a token for already register student
        // to login
        const token = createToken(student._id)

        res.status(200).json({ reg_no, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getStudents = async (req, res) => {
    const students = await Student.find({}).sort({ session: 1 }).sort({ surname: 1 }).sort({ first_name: 1 })


    res.status(200).json(students)

}

const getStudent = async (req, res) => {
    // passed id of students
    const { id } = req.params

    // check if valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    // find everything relating to such student
    const students = await Student.findById(id)

    // check if students actually exists
    if (!students) {
        return res.status(404).json({ error: 'No such students' })
    }

    // pass students's results
    res.status(200).json(students)

}

const getStudentBySession = async (req, res) => {
    const { session } = req.params

    try {

        const students = await Student.find({ session: session }).sort({ session: 1 }).sort({ surname: 1 }).sort({ first_name: 1 })
        // check if students actually exists
        if (!students) {
            return res.status(404).json({ error: 'No such students' })
        }

        // pass students's results
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({ error: error.message + " h" })

    }
}

module.exports = { signupStudent, loginStudent, getStudents, getStudent, getStudentBySession }