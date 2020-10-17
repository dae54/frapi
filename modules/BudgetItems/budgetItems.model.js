const mongoose = require('mongoose')

let budgetItemsSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    code:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        dropDups:true
    },
    description:{
        type: String,
        trim: true,
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('budget_items', budgetItemsSchema)