const express = require('express')
const { signupAdmin, loginAdmin } = require('../controllers/adminController')
// const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// login route
router.post('/signup', signupAdmin)
router.post('/login', loginAdmin)

module.exports = router