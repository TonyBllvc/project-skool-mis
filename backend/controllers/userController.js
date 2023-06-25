const generateToken = require("../config/generateToken")
const User = require("../models/userModels")

// for sign up
const registerUser = async (req, res) => {
    const { name, email, password, picture } = req.body

    // if any of the fields is not entered, return error
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    // check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, email, password, picture
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }
}

// for login
const authUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
}

// to search users
const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            // in the 'options' property, 'i' means case sensitive
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {
        // Do nothing!
    }

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })

    res.send(users)
}

module.exports = { registerUser, authUser, allUsers }