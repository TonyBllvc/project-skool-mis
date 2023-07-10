const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { signupUser, getLecturers, getLecturer } = require('../controllers/lecturerController')

const router = express.Router()

router.post('/signup', signupUser)
// router.post('/login', loginUser)
router.get('/lecturer_list', getLecturers)
router.get('/:id', getLecturer)
// router.get('/faculty/:schoolId', getDefinedLecturers)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router