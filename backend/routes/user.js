const express = require('express')
const { registerUser, authUser, allUsers } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// login route
// router.route('/).post(registerUser).get(allUsers) // can also be written as this
router.post('/', registerUser)
router.post('/login', authUser)

router.use(protect)
router.get('/', allUsers)



module.exports = router