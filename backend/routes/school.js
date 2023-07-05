const express = require('express')
const { create, gets, get, updating, deleting } = require('../controllers/schoolController')


const router = express.Router()

//create school
router.post('/create', create)
// fetch school
router.get('/fetch', gets)
// fetch one school
router.get('/:id', get)
// fetch one school
router.patch('/:id', updating )
// fetch one school
router.delete('/:id', deleting )


module.exports = router