const Admin = require('../models/adminModel')
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

// signup admin
const signupAdmin = async (req, res) => {
    const { title, surname, first_name, middle_name, role, department, faculty, phone, email, password } = req.body
    let emptyFields = []

    if (!surname) {
        emptyFields.push('No surname allocated')
    }
    if (!first_name) {
        emptyFields.push('No first name score passed')
    }
    if (!role) {
        emptyFields.push('No role score passed')
    }
    if (!department) {
        emptyFields.push('No department score passed')
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


    try {
        // pick up admin and password(with hash) 
        const admin = await Admin.signup(title, surname, first_name, middle_name, role, department, faculty, phone, email, password)

        // create a token
        const token = createToken(admin._id, admin.role)

        res.status(200).json({ title, surname, first_name, middle_name, role, department, faculty, phone, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// login admin
const loginAdmin = async (req, res) => {
    // for logging in 
    const { email, role, password } = req.body

    const admin = await Admin.findOne({ email })

    try {
        // pick up admin and password(with hash) 
        const admin = await Admin.login(email, role, password)

        // create a token for already register admin
        // to login
        const token = createToken(admin._id, admin.role)

        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getAdminProfile = async (req, res) => {
    const { email } = req.params

    const admin = await Admin.findOne({ email: email })

    // check if students actually exists
    if (!admin) {
        return res.status(404).json({ error: 'No such admin' })
    }

    res.status(200).json(admin)

}

module.exports = { signupAdmin, loginAdmin, getAdminProfile}