const mongoose = require('mongoose')

const generatedId = () => {
    return new mongoose.Types.ObjectId() 
}