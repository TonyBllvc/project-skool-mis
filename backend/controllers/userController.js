const User = require('../models/userModel')
const mongoose = require('mongoose');

const getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.find({}).find({ _id: { $ne: id} }).populate('_id' , 'title surname first_name middle_name role faculty department phone email').sort({ surname: 1}).sort({first_name: 1})
    // .sort({ title: 1 }).sort({ surname: 1 })
    // .populate("user_details", "phone schoolId level semester")


    res.status(200).json(user)
}

// to search users
const allUsers = async (req, res) => {
    const { id } = req.params
    const keyword = req.query.search ? {
        $or: [
            // in the 'options' property, 'i' means case sensitive
            { surname: { $regex: req.query.search, $options: 'i' } },
            { first_name: { $regex: req.query.search, $options: 'i' } },
            { middle_name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {
        // Do nothing!
    }

    const users = await User.find(keyword).find({ _id: { $ne: id} }).sort({ surname: 1}).sort({first_name: 1})

    res.send(users)
}


module.exports = { getUser, allUsers }