const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { signupStudent, getStudents, getStudent, getStudentBySession, loginStudent } = require('../controllers/studentController')

const router = express.Router()

router.post('/signup', signupStudent)
router.post('/login', loginStudent)
router.get('/student_list', getStudents)
router.get('/:id', getStudent)

router.get('/session/:session', getStudentBySession)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router