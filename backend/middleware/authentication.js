const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const Lecturer = require('../models/lecturerModel')
const Student = require('../models/studentModel')


const requireAuth = async (req, res, next) => {

    // verify user is authenticated
    const { authorization } = req.headers

    // to check if headers exists
    // and if it has a value
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // get token from authorization
    // which has two forms
    // 1. the bearer 'bearer'
    //  2. the hidden code that's divided into 3 parts by a dot
    // dknkfncknjdljsc.fkjnksnkvcnknkcfkf.cjdjjcbjbjbvcjjdsnc
    const token = authorization.split(' ')[1] // now we have picked the second

    try {
        // verify token
        // then grab _id
        // const { _id } = jwt.verify(token, process.env.SECRET)
        const { _id, role } = jwt.verify(token, process.env.SECRET)

        // store decoded token in a req.user body or later use
        // req.user = decodedToken

        // find the user based on role being handled
        switch (role) {
            case 'Admin':
                req.user = await Admin.findOne({ _id }).select('_id')
                break;
            case 'Lecturer':
                req.user = await Lecturer.findOne({ _id }).select('_id')
                break;
            case 'Student':
                req.user = await Student.findOne({ _id }).select('_id')
                break;
            default:
                return res.status(403).status({ message: 'Invalid user role.' })
            // break;
        }

        next()
    } catch (error) {
        console.log(error)

        // if user id doesn't exist
        res.status(401).json({ error: 'Request is not authorized' })
    }

}

module.exports = requireAuth