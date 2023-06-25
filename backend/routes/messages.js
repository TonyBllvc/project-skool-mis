const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { sendMessage, allMessages } = require('../controllers/messageControllers')

const router = express.Router()

router.use(protect)

// to send message
router.post('/', sendMessage)
// to fetch message for a particular chat
router.get('/:chatId', allMessages )

module.exports = router