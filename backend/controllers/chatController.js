const Chat = require('../models/chatModel')
const User = require('../models/userModel')

const accessChat = async (req, res) => {
    // chat if chat with user id(from the user) does exists
    const { userId, userID } = req.body

    // if not user check 
    if (!userId) {
        console.log('UserId param not sent with request')
        return res.status(400).json(error.message)
    }

    // if exists, pass this function
    var isChat = await Chat.find({
        // references (isGroupChat, users, & latestMessage ) where made from the chatModel      
        isGroupChat: false,
        $and: [
            // current user id logged
            { users: { $elemMatch: { $eq: userID } } },
            // current user id called
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', '-password').populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        // add 'picture' here later
        // ******************** go back here ******************
        select: 'title, surname, first_name, reg_no, middle_name, role, email',
    })

    // to ensure that is only one chat per user that exists
    // so if chats already exist
    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        // else, if no chat, create new chat(passed as a variable)
        var chatData = {
            chat_name: 'sender',
            isGroupChat: false,
            users: [userID, userId],
        }

        try {
            const createdChat = await Chat.create(chatData)

            const fullChat = await Chat.findOne({
                _id: createdChat.id
            }).populate(
                "users",
                "-password"
            )

            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            res.status(202).json(error.message)
        }
    }
}

const fetchChats = async (req, res) => {
    const { id } = req.params

    try {
        // find every chat the user has, then populate it 


        // Chat.find({users: {$elemMatch: { $eq: req.user._id}}}).then((result) => res.send(result)) // to pass data 
        Chat.find({
            users: {
                $elemMatch: { $eq: id }
            }
        }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 }).then(async (results) => {
            results = await User.populate(results, {
                path: 'latestMessage.sender',
                // add 'picture' here later
                select: 'name, email',
            })

            res.status(200).send(results)
        })
    } catch (error) {
        res.status(400)
        return res.status(400).json(error.message)

    }
}

const createGroupChat = async (req, res) => {
    // pass in name of group chat(name) and members(users)
    if (!req.body.users || !req.body.name || !req.body.admin ) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }

    // parse user details as "users"(because this is an array)..
    // .. we parse
    // var users = JSON.parse(req.body.users)

    // ensure that it is 2 or more users before proceeding
    if (req.body.users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat")
    }

    // now parse this curent user's details after check
    req.body.users.push(req.body.admin)

    try {
        // create a group, by parse these details into the schema
        const groupChat = await Chat.create({
            chat_name: req.body.name,
            users: req.body.users,
            isGroupChat: true,
            groupAdmin: req.body.admin
        })

        // then fill the sub schema (users, and group admin) and give the group chat and id
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat)

    } catch (error) {
        // check if error
        res.status(400)
        res.status(400).json( error.maessage )
    }
}

const renameGroupChat = async (req, res) => {
    const { chatId, chat_name } = req.body

    const updatedChat = await Chat.findByIdAndUpdate(
        // chat id
        chatId,
        {
            // new chat name
            chat_name
        },
        {
            // to indicate that it is new, and return updated value
            new: true
        }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!updatedChat) {
        res.status(400)
        throw new Error("Chat Not Found")
    } else {
        res.json(updatedChat)
    }

}

const addUserToGroup = async (req, res) => {
    const { chatId, userId } = req.body

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            // updates the users array
            $push: { users: userId }
        },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!added) {
        res.status(400).json("Chat Not Found")
    } else {
        res.status(200).json(added)
    }

}

const removeUserFromGroup = async (req, res) => {
    const { chatId, userId } = req.body

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            // updates the users array
            $pull: { users: userId }
        },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!removed) {
        res.status(400)
        throw new Error("Chat Not Found")
    } else {
        res.json(removed)
    }

}

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addUserToGroup,
    removeUserFromGroup
} 