const express = require('express')
const { registerUser, authUser, allUsers } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// router.post('/signup', signupUser)
// router.post('/login', loginUser)

router.use(protect)
router.get('/', allUsers)



module.exports = router