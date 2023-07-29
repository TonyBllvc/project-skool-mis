const express = require('express')
const { getSession } = require('../controllers/sessionController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.use(requireAuth)
router.get('/', getSession )

// there is another router, but it is embedded with student

module.exports = router