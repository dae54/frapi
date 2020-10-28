const mongoose = require('mongoose')
const Schema = mongoose.Schema

let requestAproves = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'requests',
        required: true,
    }, status: {
        type: Number,
        enum: [0, 1],
        default: 0,
    }
},
    { timestamps: true }
)

/**
 * @param status
 * 0 open
 * 1 closed
 * if open, means the aproved request is not yet aproved
 * if closed, means the aproved request is aproved, ie minimum number of aproves is reached
 */

module.exports = mongoose.model('request_aproves', requestAproves)