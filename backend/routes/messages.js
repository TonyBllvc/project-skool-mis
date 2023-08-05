const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { sendMessage, allMessages, deleteMessage, updateMessage } = require('../controllers/messageControllers')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

router.use(requireAuth)

// to send message
router.post('/', sendMessage)
// to fetch message for a particular chat
router.get('/:chatId', allMessages )
// to delete chat
router.delete('/:id', deleteMessage)
// to update chat
router.put('/:id', updateMessage)

module.exports = router