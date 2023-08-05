const express = require('express')
// const { protect } = require('../middleware/authMiddleware')
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addUserToGroup, removeUserFromGroup, deleteChat } = require('../controllers/chatController')
const requireAuth = require('../middleware/authentication')

const router = express.Router()

// give permission
router.use(requireAuth)

// // access various chats routes
router.post('/', accessChat) //single user chat
router.get('/:id', fetchChats) // fetch user chats
router.delete('/:id', deleteChat) // delete user chats
router.post('/group', createGroupChat) // create group chat
router.put('/rename', renameGroupChat) // rename group chats
router.put('/add_user', addUserToGroup) // add user 
router.put('/remove_user', removeUserFromGroup) // remove user from group

module.exports = router