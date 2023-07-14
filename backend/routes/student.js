const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { signupUser, getStudents, getStudent, getStudentBySession } = require('../controllers/studentController')

const router = express.Router()

router.post('/signup', signupUser)
// router.post('/login', loginUser)
router.get('/student_list', getStudents)
router.get('/:id', getStudent)

router.get('/session/:session', getStudentBySession)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router