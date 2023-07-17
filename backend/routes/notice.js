const express = require('express')
const { sets, updates, deletes, gets, get, getByLecturer } = require('../controllers/noticeController')


const router = express.Router()

//create notice message
router.post('/convey_notice', sets)
// fetch all notice
router.get('/get_notice', gets)
// fetch notice by id
router.get('/:id', get)
// fetch notice by lecturer id
router.get('/from/:lecturer_id', getByLecturer)
// fetch course (try and create a prevent update after a certain period of time)
router.put('/update_notice', updates)
// fetch one course
router.delete('/:id', deletes)
// fetch one course
// router.patch('/:id', updating )
// fetch one course
// router.delete('/:id', deleting )

module.exports = router