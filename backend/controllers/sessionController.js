const Session = require('../models/sessionModel')
const mongoose = require('mongoose');

const getSession = async (req, res) => {
    const session = await Session.find({})

    res.status(200).json(session)
}

module.exports = {
    getSession
}