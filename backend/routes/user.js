const express = require('express')
const { getUser, allUsers } = require('../controllers/userController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.use(requireAuth)
router.get('/',getUser )
router.get('/:id/', allUsers)

module.exports = router