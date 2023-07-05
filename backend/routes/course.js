const express = require('express')
const { sets, updates, deletes } = require('../controllers/courseController')


const router = express.Router()

//create school
router.post('/set_course', sets)
// fetch school
router.get('/get_course', updates)
// fetch one school
router.delete('/:id', deletes)
// fetch one school
// router.patch('/:id', updating )
// fetch one school
// router.delete('/:id', deleting )

module.exports = router