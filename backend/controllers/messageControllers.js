const Message = require("../models/messageModel")
const User = require("../models/lecturerModel")
const Chat = require("../models/chatModel")
const mongoose = require('mongoose');

const sendMessage = async (req, res) => {
    const { content, chatId, userId } = req.body

    if (!content || !chatId || !userId) {
        console.log("Invalid data passed into request")
        return res.status(400).json({ error: "  Invalid data passed " })
    }

    // take in data
    var newMessage = {
        sender: userId,
        content: content,
        chat_owner: chatId
    }

    try {        // parse data into data base first
        var message = await Message.create(newMessage)

        // add "picture" after directly name
        // i.e. ("sender", "name picture")
        message = await message.populate("sender", "surname first_name reg_no middle_name role email")
        message = await message.populate("chat_owner")
        // populate every user on the chat
        message = await User.populate(message, {
            path: "chat_owner.users",

            // add "picture" after directly name
            // i.e. ("name picture email")
            select: "surname first_name middle_name reg_no role email",
        })
        message = await User.populate(message, {
            path: "chat_owner.groupAdmin",

            // add "picture" after directly name
            // i.e. ("name picture email")
            select: "surname first_name middle_name reg_no role email",
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.status(200).json(message)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const allMessages = async (req, res) => {
    try {
        // find chat id, ..
        // .. then populate 
        const messages = await Message.find({
            chat_owner: req.params.chatId
        }).populate(
            "sender",
            "surname first_name middle_name role email"
        ).populate({
            path: "chat_owner",
            model: 'chatting',
            populate: {
                path: "users",
                model: "using",
                select: "surname first_name middle_name role email"
            }
        }).populate({
            path: "chat_owner",
            model: 'chatting',
            populate: {
                path: "groupAdmin",
                model: "using",
                select: "surname first_name middle_name role email"
            }
        })


        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error.message)

    }
}


const deleteMessage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const message = await Message.findByIdAndDelete({ _id: id })

    if (!message) {
        return res.status(400).json({ error: 'No such chat' })
    }

    res.status(200).json(message)
}

const updateMessage = async (req, res) => {
    // const { id } = req.params
    const { id } = req.params
    const { newContent } = req.body
    // const updatesNew = {  }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        var message = await Message.findByIdAndUpdate(
            id,
            {
                content: newContent
            },
            {
                new: true
            }).populate("chat_owner")

        message = await User.populate(message, {
            path: "chat_owner.users",

            // add "picture" after directly name
            // i.e. ("name picture email")
            select: "surname first_name middle_name reg_no role email",
        })
        
        if (!message) {
            return res.status(404).json({ error: 'No such result' })
        }

        res.status(200).json(message)
    } catch (error) {
        return res.status.json({ error: "An error occurred, sorry!" })
    }
}


module.exports = {
    sendMessage,
    allMessages,
    deleteMessage,
    updateMessage

}