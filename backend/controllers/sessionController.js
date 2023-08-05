const Session = require('../models/sessionModel')
const mongoose = require('mongoose');

// The code to create session is embedded with the student controller

// to get the session
const getSession = async (req, res) => {
    const session = await Session.find({}).sort({ session: 1 })

    res.status(200).json(session)
}

module.exports = {
    getSession
}