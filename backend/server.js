require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const schoolRoutes = require('./routes/school')
const courseRoutes = require('./routes/course')
const resultRoutes = require('./routes/result')
const timeRoutes = require('./routes/timetable')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/school', schoolRoutes)
app.use('/api/course', courseRoutes) // come back to this after creating lecturer and school field
app.use('/api/result', resultRoutes) // come back to this after creating student field
app.use('/api/time', timeRoutes )
// app.use('/api/student', studentRoutes)
// app.use('/api/timetable', timetableRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })

  })
  .catch((err) => {
    console.log(err)
  }) 