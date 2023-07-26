const express = require('express')
const { signupLecturer, getLecturers, getLecturerProfile, loginLecturer, searchLecturer } = require('../controllers/lecturerController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.post('/signup', signupLecturer)
router.post('/login', loginLecturer)

// router.use(requireAuth)
router.get('/lecturer_list', getLecturers)
router.get('/:email', getLecturerProfile)
router.get('/', searchLecturer)

// router.get('/faculty/:schoolId', getDefinedLecturers)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router