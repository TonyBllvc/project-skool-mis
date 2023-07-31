const User = require('../models/userModel')
const mongoose = require('mongoose');

const getUser = async (req, res) => {
    
    const user = await User.find({}).populate('_id' , 'title surname first_name middle_name role faculty department phone email')
    // .sort({ title: 1 }).sort({ surname: 1 })
    // .populate("user_details", "phone schoolId level semester")


    res.status(200).json(user)
}


module.exports = { getUser }