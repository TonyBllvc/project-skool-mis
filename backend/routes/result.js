const express = require('express')
const { sets, updates, deletes, gets, get } = require('../controllers/resultController')


const router = express.Router()

//create course
router.post('/set_result', sets)
// fetch courses
router.get('/get_results', gets)
// fetch one course
router.get('/:id', get)
// fetch course
router.patch('/:id', updates)
// fetch one course
router.delete('/:id', deletes)
// fetch one course
// router.patch('/:id', updating )
// fetch one course
// router.delete('/:id', deleting )

module.exports = router