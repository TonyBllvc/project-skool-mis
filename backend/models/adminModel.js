const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

// Create schema and model
const adminSchema = new Schema({
    title: {
        type: String,
        require: true,
        // unique: true
    },
    surname: {
        type: String,
        require: true,
        // unique: true
    },

    first_name: {
        type: String,
        require: true,
        // unique: true
    },
    middle_name: {
        type: String,
        // unique: true
    },
    role: {
        type: String,
        enum: 'Admin',
        require: true
    },

    department: {
        type: String,
        // unique: true
    },
    faculty: {
        type: String,
        // unique: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true,
        validate: {
            validator: (val) => {
                return val.length = 11
            },
            message: 'Phone Number must be at least 11 digits long'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // to validate that is is an actual email
        validate: {
            validator: (val) => {
                return validator.isEmail(val)
            },
            message: (props) => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        require: true,
        validate: {
            validator: (val) => {
                return val.length >= 6
            },
            message: 'Password must be at least 6 characters long'
        }
    },
}, { timestamps: true })


// static signup method
// ( while using the 'this' keyword, we can't use  the arrow function)
adminSchema.statics.signup = async function (title, surname, first_name, middle_name, role, department, faculty, phone, email, password) {

    // validation
    // check if the mail and password both have values
    if (!surname || !first_name || !role || !department || !faculty || !phone || !email || !password) {
        throw Error('All fields must be filled')
    }
    // check if email is valid(if the email put in is an actual email)
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    // check for if strong password
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    if (phone.length > 11 || phone.length < 11) {
        throw Error('Digits is incomplete')

    }

    // to check for replicated emails
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Emails already in use')
    }
    // to check for replicated phone number
    const exist = await this.findOne({ phone })

    if (exist) {
        throw Error('Phone number already in use')
    }

    // for two different users use the same password
    // the salt creates a different hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = await this.create({ title, surname, first_name, middle_name, role, department, faculty, phone, email, password: hash })

    return admin
}

// static login method
adminSchema.statics.login = async function (email, role, password) {
    // validation
    // check if the mail and password both have values
    if (!email || !role || !password) {
        throw Error('All fields must be filled')
    }


    // to find the admin with email
    const admin = await this.findOne({ email })

    // check if admin exists or not
    // if not, throw error
    if (!admin) {
        throw Error('Incorrect email')
    }

    // match passwords with the hashed version, to compare
    // two arguments:(
    // 1. normal password value 
    // 2. encrypted password version(hashed) 
    // )
    const match = await bcrypt.compare(password, admin.password)

    if (!match) {
        throw Error(' Incorrect password')
    }

    return admin
}

// adminSchema.statics.changeLog = async function (id, title, surname, first_name, middle_name, role, department, faculty, phone, email, password) {
//     // 
//     const admin = await this.findById({ _id: id })

//     // check if students actually exists
//     if (!admin) {
//         throw Error('No such admin')
//     }

//     try {

//         if (password) {
//             const match = await bcrypt.compare(password, admin.password);
//             if (match) {
//                 // const salt = await bcrypt.genSalt(10)
//                 // const hashedNewPassword = await bcrypt.hash(password, salt);
//                 //    admin.title = title, 
//                 //    admin.surname = surname, 
//                 //    admin.first_name = first_name, 
//                 //    admin.middle_name = middle_name, 
//                 //    admin.role = role, 
//                 //    admin.department = department,
//                 //    admin.faculty = faculty, 
//                 //    admin.phone = phone,
//                 //    admin.email = email

//                 const newData = await this.findByIdAndUpdate(
//                     id,
//                     {
//                         title, surname, first_name, middle_name, role, department, faculty, phone, email,
//                     },
//                     {
//                         new: true
//                     }
//                 )

//                 return newData
//             } else {
//                 throw Error('Current password is incorrect')
//             }
//         }


//         return newData
//         // res.json({ message: 'Profile updated successfully' });
//     } catch (error) {
//         throw Error('Wrong')
//     }

// }

module.exports = mongoose.model('administration', adminSchema);