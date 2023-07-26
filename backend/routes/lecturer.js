const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { signupLecturer, getLecturers, getLecturer, loginLecturer } = require('../controllers/lecturerController')

const router = express.Router()

router.post('/signup', signupLecturer)
router.post('/login', loginLecturer)
router.get('/lecturer_list', getLecturers)
router.get('/:id', getLecturer)
// router.get('/faculty/:schoolId', getDefinedLecturers)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router