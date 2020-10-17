const mongoose = require('mongoose')

let settingsSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        dropDups:true,
        trim: true,
    },
    value:{
        type: Number,
        trim: true,
        required: true,
    },
    description:{
        type: String,
        trim: true,
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('settings', settingsSchema)