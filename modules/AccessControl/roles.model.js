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
    permission: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "permission"
        }
    ],
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



/**
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
    permission: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission"
        }
    ],
    // type: {
    //     type: Number,
    //     enum: [0, 1],
    //     default: 0,
    //     required: true
    // },
    approvalStatus: {
        type: Number,
        enum: [0, 1],
        default: 0,
    }
},
    { timestamps: true }
);*/

// type
// if a role is a system defined, the type is 1
// if a role is user defined, the type is 0