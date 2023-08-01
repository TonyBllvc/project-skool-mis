const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { sendMessage, allMessages } = require('../controllers/messageControllers')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.use(requireAuth)

// to send message
router.post('/', sendMessage)
// to fetch message for a particular chat
router.get('/:chatId', allMessages )

module.exports = router