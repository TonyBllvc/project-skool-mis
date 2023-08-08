const Student = require('../models/studentModel')
const Session = require('../models/sessionModel')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// signup student
const signupStudent = async (req, res) => {
    const { surname, first_name, middle_name, role, session, reg_no, faculty, department, phone, email, password } = req.body

    let emptyFields = []

    if (!surname) {
        emptyFields.push('No surname allocated')
    }
    if (!first_name) {
        emptyFields.push('No first name passed')
    }
    if (!role) {
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

    // var reg_no = reg_no

    const regExists = await Student.findOne({ reg_no })
    if (regExists) {
        return res.status(404).json({ error: 'Reg number already exits' })
    }

    const emailExists = await Student.findOne({ email })
    if (emailExists) {
        return res.status(404).json({ error: 'Email already exits' })
    }

    try {
        // pick up student and password(with hash) 
        var student = await Student.signup(
            surname, first_name, middle_name, role, session, reg_no, faculty, department, phone, email, password
        )


        // create a token
        const token = createToken(student._id, student.role)

        res.status(200).json({ surname, first_name, middle_name, role, session, reg_no, faculty, department, phone, email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
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
    const { reg_no, role, password } = req.body

    try {
        // pick up student and password(with hash) 
        const student = await Student.login(reg_no, role, password)

        // create a token for already register student
        // to login
        const token = createToken(student._id, student.role)

        const userData = {
            reg_no,
            role,
            token,
            _id: student._id,
            surname: student.surname,
            first_name: student.first_name,
            middle_name: student.middle_name,
            phone: student.phone,
            email: student.email
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


const changePassword = async (req, res) => {
    const { id, password, newPassword } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' });
    }

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Compare current password
        const passwordsMatch = await bcrypt.compare(password, student.password);
        if (!passwordsMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database
        await Student.findByIdAndUpdate(id, { password: hashedNewPassword });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getStudents = async (req, res) => {
    const students = await Student.find({}).sort({ session: 1 }).sort({ surname: 1 }).sort({ first_name: 1 })


    res.status(200).json(students)

}

const getStudent = async (req, res) => {
    // passed id of students
    // const { reg_no } = req.params
    const { id } = req.params

    // check if valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    // find everything relating to such student
    // const students = await Student.findOne({ reg_no: reg_no})

    const students = await Student.findById(id)

    // check if students actually exists
    if (!students) {
        return res.status(404).json({ error: 'No such students' })
    }

    // pass students's results
    res.status(200).json(students)

}

const searchStudent = async (req, res) => {
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

        const users = await Student.find(keyword)

        res.status(200).json(users)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }

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
        res.status(500).json({ error: error.message })

    }
}

module.exports = { signupStudent, loginStudent, getStudents, getStudent, searchStudent, getStudentBySession, changePassword }