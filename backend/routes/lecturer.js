const express = require('express')
const { signupLecturer, getLecturers, getLecturerProfile, loginLecturer, searchLecturer, changePassword, updateProfile } = require('../controllers/lecturerController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.post('/sign_up', signupLecturer)
router.post('/login', loginLecturer)

router.use(requireAuth)
router.put('/update',updateProfile)
router.put('/update_password', changePassword)
router.get('/lecturer_list', getLecturers)
router.get('/:email', getLecturerProfile)
router.get('/', searchLecturer)

// router.get('/faculty/:schoolId', getDefinedLecturers)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router