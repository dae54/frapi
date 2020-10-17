const mongoose = require('mongoose');

const NotificationSubcribers = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('notificationSubcribers', NotificationSubcribers);