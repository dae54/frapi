const mongoose = require('mongoose')
const Schema = mongoose.Schema


let attachment = mongoose.Schema({
    name: {
        type: String,
    },
    mimetype: {
        type: String
    }
})

let remark = mongoose.Schema({
    title: {
        type: String,
    },
    message: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
}, { timestamps: true }
)

let statusChange = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    fromStatus: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6],
    },
    toStatus: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6],
    },reason:{
        type: String
    }
}, { timestamps: true }
)

let requests_schema = Schema({
    budgetItemId: {
        type: Schema.Types.ObjectId,
        ref: 'budget_items',
        required: true
    },
    budgetId: {
        type: Schema.Types.ObjectId,
        ref: 'budgets',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    approvedAt: {
        type: Date,
    },
    rejectedAt: {
        type: Date,
    },
    disbursedAt: {
        type: Date,
    },
    confirmedAt: {
        type: Date,
    },
    status: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6],
        default: 0,
    },
    statusChangedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    amount: {
        type: Number,
        required: true
    },
    // statusChangedBy: [statusChange],
    remarks: [remark],
    attachments: [attachment]
},
    { timestamps: true }
)
module.exports = mongoose.model('requests', requests_schema)

/*STATUS
* 0 pending
* 1 OnHold
* 2 Approved
* 3 Rejected
* 4 Disbursed
* 5 Confirmed
* 6 Cancelled
*/