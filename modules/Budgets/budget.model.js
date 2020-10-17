const mongoose = require('mongoose')

let budget_items_schema = mongoose.Schema({
    budgetItemId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'budget_items',
        // unique: true,
        // dropDups: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    availableAmount: Number
})

let budgetSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    description: {
        type: String,
        trim: true
    },
    /*
    *0 Pending
    *1 Active
    *2 Closed
     */
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    closedDate: {
        type: Date,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true,
    },
    activatedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users',
    },
    budgetItems: [budget_items_schema]
},
    { timestamps: true }
)
module.exports = mongoose.model('budgets', budgetSchema)
//TODO
//make name field unique
