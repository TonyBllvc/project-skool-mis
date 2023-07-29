const express = require('express')
const { sets, gets, get, updates, deletes } = require('../controllers/timeTableController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.use(requireAuth)
//create course
router.post('/set_time_table', sets)
// fetch courses
router.get('/get_time_table', gets)
// fetch one course
router.get('/:id', get)// fetch course
// update course 
router.put('/update', updates)
// fetch one course
router.delete('/:id', deletes)

module.exports = router