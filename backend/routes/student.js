const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { signupStudent, getStudents, getStudent, getStudentBySession, loginStudent, searchStudent, changePassword } = require('../controllers/studentController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.post('/sign_up', signupStudent)
router.post('/login', loginStudent)

router.use(requireAuth)
router.put('/update_password', changePassword)
router.get('/student_list', getStudents)
router.get('/:id', getStudent)
router.get('/', searchStudent)
router.get('/session/:session', getStudentBySession)

// router.use(protect)
// router.get('/', allUsers)



module.exports = router