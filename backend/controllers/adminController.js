const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

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

    try {
        // pick up admin and password(with hash) 
        const admin = await Admin.login(email, role, password)

        // create a token for already register admin
        // to login
        const token = createToken(admin._id, admin.role)


        const userData = {
            email,
            role,
            token,
            _id: admin._id,
            title: admin.title,
            surname: admin.surname,
            first_name: admin.first_name,
            middle_name: admin.middle_name,
            faculty: admin.faculty,
            department: admin.department,
            phone: admin.phone,
            email: admin.email
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// Update user profile details
const updateProfile = async (req, res) => {
    // const { id } = req.params
    const { id, title, surname, first_name, middle_name, department, faculty, phone, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        
        const admin = await Admin.findById(id);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        if (password) {
            const match = await bcrypt.compare(password, admin.password);
            if (!match) {
                return res.status(400).json({ error: "Incorrect password" });
            }
        } else {
            return res.status(400).json({ error: "Please provide your password" });
        }
        
        // Update the profile details
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { 
                title, surname, first_name, middle_name, department, faculty, phone, email 
            },
            { new: true }
        );

        const token = createToken(admin._id, admin.role)

        const newProfile = {
            title, surname, first_name, middle_name, department, faculty, phone, email, token 
        }

        res.status(200).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
const changePassword = async (req, res) => {
    const { id, password, newPassword } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' });
    }

    try {
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Compare current password
        const passwordsMatch = await bcrypt.compare(password, admin.password);
        if (!passwordsMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database
        await Admin.findByIdAndUpdate(id, { password: hashedNewPassword });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const updateProfile = async (req, res) => {
//     // const { id } = req.params
//     const { id, title, surname, first_name, middle_name, role, department, faculty, phone, email, password } = req.body;

//     try {

//         const admin = await Admin.changeLog(id, title, surname, first_name, middle_name, role, department, faculty, phone, email, password)

//         const userData = {
//             email,
//             role,
//             _id: admin._id,
//             surname: admin.surname,
//             first_name: admin.first_name,
//             middle_name: admin.middle_name,
//             phone: admin.phone
//         }
//         res.status(200).json(userData)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }

// }

const getAdminProfile = async (req, res) => {
    const { email } = req.params

    const admin = await Admin.findOne({ email: email })

    // check if students actually exists
    if (!admin) {
        return res.status(404).json({ error: 'No such admin' })
    }

    res.status(200).json(admin)

}

module.exports = { signupAdmin, loginAdmin, getAdminProfile, updateProfile, updateProfile, changePassword }