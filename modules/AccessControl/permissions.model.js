const mongoose = require('mongoose')
const PermissionSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    genericName: {
        type: String,
        required: true,
    },
    displayNameId: {
        type: Number,
        required: true,
    },
    moduleName: {
        type: String,
        required: true,
    },
    moduleId: {
        type: Number,
        required: true,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Permission', PermissionSchema);