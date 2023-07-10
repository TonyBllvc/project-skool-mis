const express = require('express')
const { sets, updates, deletes, gets, get, getStudent, searchResult } = require('../controllers/resultController')


const router = express.Router()

//create result
router.post('/set_result', sets)
// fetch results
router.get('/get_results', gets)
// fetch one result
router.get('/:id', get)
// fetch one student
router.get('/:student_id/result', getStudent)
// search or results
// router.get('/', searchResult)
// fetch one course
router.delete('/:id', deletes)
// fetch one course
// router.patch('/:id', updating )
// fetch one course
// router.delete('/:id', deleting )

module.exports = router