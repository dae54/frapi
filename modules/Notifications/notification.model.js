const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();

let recepient = mongoose.Schema({
    recepientID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    // status: {
    //     type: Number,
    //     enum: [0, 1],
    //     default: 0
    //     //DEPRECATED
    // },
    readStatus: {
        type: Number,
        enum: [0, 1],
        default: 0
        //0 UNREAD
        //1 READ
    },
    readAt: {
        type: Date,
        default: null
    }
})

let notificationSchema = mongoose.Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    recepient: [recepient],

    // readAt: {
    //     type: Schema.Types.Date,
    //     default: null
    //     //DEPRECATED
    // },
    subject: {
        type: String,
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['users', 'roles', 'requests', 'budgets']
    },
    dataRef: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    message: {
        type: String,
        // required: true,
    },
    // requestId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'requests'
    // },
    // status: {
    //     type: Number,
    //     enum: [0, 1],
    //     default: 0
    // },

    // recepient: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users',
    // },
    // status: {
    //     type: Number,
    //     enum: [0, 1],
    //     default: 0
    // },
    // recepient: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     refPath: 'onModel'
    // },
    // onModel: {
    //     type: String,
    //     required: true,
    //     enum: ['users', 'roles']
    // },
    /**status
     * 0 notRead
     * 1 read
     */
}, { timestamps: true })
    .pre('save', () => {
        console.log('pre save')
    })
    .post('save', () => {
        eventEmitter.emit('save')
        console.log('post save')
    })

const NotificationSchema = mongoose.model('notifications', notificationSchema)
// NotificationSchema.watch().on('change', data => console.log(data))
module.exports = { NotificationSchema, eventEmitter }
/**
 * notifications
 * should have the source //sourceID
 * shold have the destination //receiverID
 *
 * should have the message body message
 * should have status (read or not read) status [0,1]
 * should have read time //updated at
 * should have time issued //created at
 *
 * in the system, who will receive notifications
 * 1. requester, case for any change in status
 * 2. aprover, case there is any new request
 *      =>this should be controlled. ie the second aprover should not aprove before the first. the third either
 * 3. on opening quota for the new budget (both requester and)
 */
// from finlink
// resource: {
//     type: Schema.Types.ObjectId,
//     refPath: 'onModel',
//     required: true,
// },
// onModel: {
//     type: String,
//     required: true,
//     enum: ['Account']
// },
// recipient: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
// },
// extras: {
//     type: Object
// },
// /*  type: {
//     type: String
// }, */
// topic: {
//     type: String
// },
// updatedBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
// },
// createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
// },
// readAt: {
//     type: Schema.Types.Date,
//     default: null
// },