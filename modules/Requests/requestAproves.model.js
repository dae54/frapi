const mongoose = require('mongoose')
const Schema = mongoose.Schema

let requestAproves = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    requestId:{
        type: Schema.Types.ObjectId,
        ref: 'requests',
        required: true,
    }
})

module.exports = mongoose.model('request_aproves', requestAproves)