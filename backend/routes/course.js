const express = require('express')
const { sets, updates, deletes, gets, get } = require('../controllers/courseController')
const requireAuth = require('../middleware/authentication')


const router = express.Router()

router.use(requireAuth)
//create course
router.post('/set_course', sets)
// fetch courses
router.get('/get_courses', gets)
// fetch one course
router.get('/:id', get)
// fetch course
router.put('/:id', updates)
// fetch one course
router.delete('/:id', deletes)
// fetch one course
// router.patch('/:id', updating )
// fetch one course
// router.delete('/:id', deleting )

module.exports = router