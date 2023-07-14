const express = require('express')
const { getSession } = require('../controllers/sessionController')

const router = express.Router()

router.get('/', getSession )

// there is another router, but it is embedded with student

module.exports = router