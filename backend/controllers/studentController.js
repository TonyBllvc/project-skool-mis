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
    const { surname, first_name, middle_name, students, session, reg_no, faculty, department } = req.body

    const regExists = await Student.findOne({ reg_no })
    if (regExists) {
        return res.status(404).json({ error: 'Reg already exits' })
    }

    try {
        // pick up user and password(with hash) 
        const user = await Student.create({
            surname, first_name, middle_name, students, session, reg_no, faculty, department
        })


        // create a token
        // const token = createToken(user._id)

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

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

    // find everything relating to such user
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

module.exports = { signupUser, loginUser, getStudents, getStudent, getStudentBySession }