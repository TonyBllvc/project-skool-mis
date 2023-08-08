const express = require('express')
const { signupAdmin, loginAdmin, getAdminProfile, updateProfile, changePassword } = require('../controllers/adminController')
const requireAuth = require('../middleware/authentication')
// const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// login route
router.post('/signup', signupAdmin)
router.post('/login', loginAdmin)

router.use(requireAuth)
router.put('/update',updateProfile)
router.put('/update_password', changePassword)
router.get('/profile/:email', getAdminProfile)

module.exports = router