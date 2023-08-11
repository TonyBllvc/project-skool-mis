require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const schoolRoutes = require('./routes/school')
const courseRoutes = require('./routes/course')
const resultRoutes = require('./routes/result')
const timeRoutes = require('./routes/timetable')
const lecturerRoutes = require('./routes/lecturer')
const studentRoutes = require('./routes/student')
const noticeRoutes = require('./routes/notice')
const sessionRoutes = require('./routes/session')
const chatRoutes = require('./routes/chats')
const messageRoutes = require('./routes/messages')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
// express app
const app = express()

const corsOptions = {
  origin: [
    'https://project-skool-mis-tonybllvc.vercel.app',
    'https://project-skool-mis-git-main-tonybllvc.vercel.app',
    'https://project-skool-j6xgpsktf-tonybllvc.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type', 'Authorization'
  ]
}

app.use(cors(corsOptions))
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
// app.get('/health', (req, res) => {
//   res.status(200).send('OK');
// });

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// routes
app.use('/api/school', schoolRoutes)
app.use('/api/course', courseRoutes) // come back to this after creating lecturer and school field
app.use('/api/result', resultRoutes) // come back to this after creating student field
app.use('/api/time', timeRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/lecturer', lecturerRoutes)
app.use('/api/notice', noticeRoutes)
app.use('/api/session', sessionRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)


const PORT = process.env.PORT || 5000;
// connect to db
// mongoose.connect(process.env.MONGO_URI_API,
mongoose.connect('mongodb+srv://bllvcjboi:TinJBllvckq@cluster0.sbsoszl.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to database')
    // listen to port
    const server = app.listen(PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })

    // implementation of socket io
    const io = require('socket.io')(server, {
      // amount of time it will wait before closing connection
      // to save bandwidth
      pingTimeout: 60000,
      cors: {
        origin: [
    'https://project-skool-mis-tonybllvc.vercel.app',
    'https://project-skool-mis-git-main-tonybllvc.vercel.app',
    'https://project-skool-j6xgpsktf-tonybllvc.vercel.app'
  ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      }
    })

    io.on("connection", (socket) => {
      console.log("Connection made")

      // User should be connected to personal socket
      socket.on("active", (userData) => {
        // creates new room for client with use id
        socket.join(userData._id)
        // console.log(userData._id)
        // to pass connection updates
        socket.emit("active_user", userData._id)
        console.log(userData.surname + ' Just logged in')
      })
      // User should be connected to personal socket
      socket.on("setup", (userData) => {
        // creates new room for client with use id
        socket.join(userData._id)
        // console.log(userData._id)
        // to pass connection updates
        socket.emit("connected", userData._id )
        console.log(userData.surname + ' Just joined in')
      })
      // for joining chats 
      socket.on("join_chat", (room) => {
        socket.join(room)
        console.log("User Joined Room: " + room)
      })

      socket.on("typing", (room) =>
        socket.in(room).emit("typing")
      )

      socket.on("stop_typing", (room) =>
        socket.in(room).emit("stop_typing")
      )

      socket.on("new_message", (newMessageReceived) => {

        // which chat it belongs to, parse in a var
        var chat = newMessageReceived.chat_owner

        // if no user exists
        if (!chat.users) {
          return console.log('Chat user not defined')
        }

        console.log('success pass')

        // pass to all other users but me
        chat.users.forEach((user) => {
          // if chat of owner is the same as that  of sender, return 
          if (user._id === newMessageReceived.sender._id) {
            return console.log('not success')
          }

          socket.in(user._id).emit("message_received", newMessageReceived)
          console.log('success')
        })

      })

      // socket.off("setup", (userData) => {
      //   console.log(" USER DISCONNECTED")
      //   socket.leave(userData._id)
      // })

    })

  })
  .catch((err) => {
    console.log(err)
  }) 