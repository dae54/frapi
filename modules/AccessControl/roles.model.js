const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
    },
    approvalStatus: {
        type: Number,
        enum: [0, 1],
        default: 0,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('role', RoleSchema);

// type
// if a role is a system defined, the type is 1
// if a role is user defined, the type is 0