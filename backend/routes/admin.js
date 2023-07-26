const express = require('express')
const { signupAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminController')
const requireAuth = require('../middleware/authentication')
// const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// login route
router.post('/signup', signupAdmin)
router.post('/login', loginAdmin)

// router.use(requireAuth)
router.get('/profile/:email', getAdminProfile)

module.exports = router