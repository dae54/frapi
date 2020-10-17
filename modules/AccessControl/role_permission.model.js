const mongoose =require('mongoose');

const RolePermissionSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('RolePermission', RolePermissionSchema);