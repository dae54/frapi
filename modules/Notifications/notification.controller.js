const Notifications = require('./notification.model').NotificationSchema
const EventEmitter = require('./notification.model').eventEmitter

var socketIO = require('socket.io')

module.exports = {
    init: async (server) => {
        const io = socketIO(server)
        io.on('connection', (socket) => {
            getNotificationAndEmit(socket, socket.client.request._query.userID)
            console.log('socket connected by ', socket.client.request._query.userID)
            EventEmitter.on('save', () => {
                return getNotificationAndEmit(socket, socket.client.request._query.userID)
            })
            socket.on('disconnect', () => {
                console.log('client disconnected')
                // io.close()
            })
        })

        io.of('/notificationCount')
            .on('connection', socket => {
                getNotificationCountAndEmit(socket, socket.client.request._query.userID)
                console.log('socket connected by ', socket.client.request._query.userID)
                EventEmitter.on('save', () => {
                    return getNotificationCountAndEmit(socket, socket.client.request._query.userID)
                })
                socket.on('disconnect', () => {
                    // console.log('client disconnected')
                    // io.close()
                })
            })
    },
    storeNotification: async ({ createdBy, recepients, subject, onModel, dataRef }) => {
        var notification = new Notifications({
            createdBy, subject, onModel, dataRef
        })
        notification.recepient = recepients
        const status = notification.save()
        return status;
    },
    fetchNotifications: async (req, res) => {
        try {
            const notifications = await Notifications.find()
                .select('createdAt createdBy recepient requestId')
                .sort('-createdAt')
                .populate('recepient.recepientID createdBy')
                .populate({
                    path: 'recepient.recepientID',
                    select: 'firstName lastName status readAt'
                })
                .populate({
                    path: 'createdBy',
                    select: 'firstName lastName'
                })
            return res.status(200).json({
                status: true,
                message: 'notifications ready',
                data: notifications
            })
        } catch (e) {
            return res.status(400).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    fetchNotificationByUserID: async (req, res) => {
        try {
            // const { userId } = req.body
            const notifications = await Notification.findOneAndUpdate({ userId: req.params.userID, status: 0 }, { status: 1 })
            //status 0 = not read, 1 read
            return res.status(200).json({
                status: true,
                message: 'notifications ready',
                data: notifications
            })

        } catch (e) {
            return res.status(400).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    markRead: async (req, res) => {
        try {
            const { requestId, userId } = req.body
            const notif = await Notifications.findOne({ requestId, 'recepient.recepientID': userId })
            notif.recepient.forEach(item => {
                if (item.recepientID.toString() === userId) {
                    item.status = 1
                }
            })
            notif.readAt = new Date().toISOString()
            notif.save()
            return res.status(200).json({
                status: true,
                message: 'marked read',
                data: {}
            })
        } catch (e) {
            return res.status(400).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.params)
            await Notifications.deleteOne({ _id: req.params.notificationID })
            res.status(200).json({
                message: 'deleted',
                status: true,
                // data:
            })
        } catch (e) {
            return res.status(400).json({
                userMessage: 'Whoops something went wrong',
                developerMessage: e.message
            })
        }
    },
    subscribe: async (req, res) => {
        console.log('subscribe')
        // const { subscription } = req.body
        // // console.log(res)
        // res.status(201).json({})
        // const payload = JSON.stringify({ title: 'sam Notification From daniel that wont show' })

        // webpush
        //     .sendNotification(subscription, payload)
        //     .catch(err => console.log(err))
    },
}
const getNotificationAndEmit = async (socket, userId) => {
    // const notifications = await Notifications.find({ 'recepient.recepientID': userId, 'recepient.status': 0 })
    const notifications = await Notifications.find({ 'recepient.recepientID': userId, 'recepient.readStatus': 0 })
        // .select('createdBy subject requestId createdAt')
        .sort('-createdAt')
        .populate('createdBy', 'firstName lastName')
        .populate('dataRef')
    console.log('**************************')
    console.log(notifications)
    console.log('**************************')

    socket.emit("notifications", notifications)
}

const getNotificationCountAndEmit = async (socket, userId) => {
    const count = await Notifications.find({ 'recepient.recepientID': userId, 'recepient.status': 0 }).countDocuments()
    socket.emit("notificationsCount", count)
}

/** TODO
 * Accountant
 * -after create bdget, show notifications //
 * -after reaching a week before budget ends, show notifications //
 * -when budget is activated, show notification //
 *
 * -when budget for specific item is about to be over, show notifications
 * -when there is a pending request, show notification
 */
/**
 * how to check if the budget is about to be over
 * 1.query all requests thats are confirmed per given budget item id
 * 2.add the amounts disbursed,
 * 3.subtract the total from the initial amount in the budget entry
 * 4.if the balance is
 */
/**
 * how to know if its pending
 * 1. check the status
 * 2. if more than one aprover is selected in the settings, include extra logics
 * >>qery the id of the aprover in the request_approves
 * >>then find if there is a matching id to the logged in user (aprover)
 * >>if there is a match, dont add it to notifications
 * >>else add it to notifications, referencing to the user (aprover)
 */
/**
 * the requester needs to see the notification of
 */

//  *********************************************************************
// from finlink
// import Account from "../accounts/account.model";
// import User from "../users/user.model";
// import Notifications from "./notifications.model";
// import Topics from "./topics.model";
// import { logEvent } from "../auditTrail/auditTrail.controller";
// import RolePermission from "../accessControl/role.permission.model";

// export async function subscribeToNotifications(req, res) {
//     try {
//         const user = req.user;
//         const topics = req.body.topics;
//         topics.added.forEach(async topic => {
//             const count = await User.countDocuments({ _id: user._id, 'subscribedTopics': topic });
//             if (count === 0) {
//                 const userTopics = await User.findOneAndUpdate(
//                     { _id: user._id },
//                     { $push: { subscribedTopics: topic } },
//                     {
//                         new: true
//                     }
//                 );
//                 const subscribedUsers = await Topics.findOneAndUpdate(

//                     { genericName: topic },
//                     { $push: { users: user.displayName } },
//                     {
//                         new: true
//                     }
//                 );
//             }
//         });
//         if (topics.removed.length > 0) {
//             await unsubscribe(user, topics.removed);
//         }
//         return res.status(200).json({ message: "Done successfully" });
//     } catch (e) {
//         return res.status(500).json(e.message);
//     }
// }
// async function unsubscribe(user, topics) {
//     try {
//         topics.forEach(async topic => {
//             const userTopics = await User.findOneAndUpdate(
//                 { _id: user._id },
//                 { $pull: { subscribedTopics: topic } },
//                 {
//                     new: true
//                 }
//             );
//             const subscribedUsers = await Topics.findOneAndUpdate(
//                 { genericName: topic },
//                 { $pull: { users: user.displayName } },
//                 {
//                     new: true
//                 }
//             );
//         });
//     } catch (e) {
//         console.log(e.message);
//     }
// }
// export async function updateReadStatus(req, res) {
//     try {
//         const status = await Notifications.findOneAndUpdate(
//             {
//                 _id: req.params.id
//             },
//             {
//                 readAt: Date.now()
//             },
//             {
//                 new: true
//             }
//         );
//         return res.status(200).json(status);
//     } catch (e) {
//         return res.status(HTTPStatus.BAD_REQUEST).json({
//             userMessage: e.message,
//             developerMessage: e.message
//         });
//     }
// }
// export async function getNotifications(req, res) {
//     try {
//         console.log(req.user)
//         const topics = req.user.subscribedTopics;
//         const notificationsArr = [];
//         const notifications = await Notifications.find({ 'topic': { $in: topics } }).populate('resource').sort({ createdAt: -1 });
//         notifications.forEach(({ _id, extras, resource, readAt, updatedBy, createdBy, createdAt, updatedAt, type, topic }, ) => {
//             const transaction = resource.transactions.find(transaction => transaction._id.toString() === extras._id.toString());
//             notificationsArr.push({ _id, extras, readAt, updatedBy, createdBy, createdAt, updatedAt, resource: transaction, type, topic });
//         })
//         return res.status(200).json(notificationsArr);
//     } catch (e) {
//         return res.status(500).json(e.message);
//     }
// }
// export async function storeNotification(resource, onModel, createdBy, extras, type, topic) {
//     const status = await Notifications.create({ resource, onModel, createdBy, extras, type, topic });
// }
// export async function automaticSubscription(user) {
//     try {
//         if (typeof user.role !== "undefined") {
//             const topics = ['transaction-checker', 'transaction-maker', 'approve-role'];
//             const permissions = await getPermissionsByroleID(user.role);
//             permissions.forEach(async permission => {
//                 topics.forEach(async topic => {
//                     if (topic === permission.permission.genericName) {
//                         const count = await User.countDocuments({ _id: user._id, 'subscribedTopics': topic });
//                         if (count === 0) {
//                             const userTopics = await User.findOneAndUpdate(
//                                 { _id: user._id },
//                                 { $push: { subscribedTopics: topic } },
//                                 {
//                                     new: true
//                                 }
//                             );
//                             const subscribedUsers = await Topics.findOneAndUpdate(

//                                 { genericName: topic },
//                                 { $push: { users: user.displayName } },
//                                 {
//                                     new: true
//                                 }
//                             );
//                         }
//                     }
//                 });
//             });
//         }
//     } catch (e) {
//         console.log(e.message);
//     }
// }
// export async function getPermissionsByroleID(roleID) {
//     const permissions = await RolePermission.find({
//         role: roleID
//     }).populate('permission');
//     return permissions;
// }
// export async function unsubscribeNotifications(user, topic) {
//     try {
//         const topics = ['transaction-checker', 'transaction-maker', 'approve-role'];
//         if (topics.includes(topic)) {
//             const userTopics = await User.findOneAndUpdate(
//                 { _id: user._id },
//                 { $pull: { subscribedTopics: topic } },
//                 {
//                     new: true
//                 }
//             );
//             const subscribedUsers = await Topics.findOneAndUpdate(
//                 { genericName: topic },
//                 { $pull: { users: user.displayName } },
//                 {
//                     new: true
//                 }
//             );
//         }
//     } catch (e) {
//         console.log(e.message);
//     }
// }