const mongoose = require('mongoose')

let userSessionSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    // isAuthorized: {
    //     type: Boolean,
    //     default: false
    // },
    userDetails: {
        type: Object,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('userSession', userSessionSchema)