const mongoose = require('mongoose');

let _module = mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
})

const RolePermissionSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    modules: [_module]
},
    { timestamps: true }
);

module.exports = mongoose.model('RolePermission', RolePermissionSchema);



// const mongoose = require('mongoose');

// let permission = mongoose.Schema({
//     permissionId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Permission',
//     }
// })

// let _module = mongoose.Schema({
//     module: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Permission',
//     },
//     permissions: [permission]
//     // {
//     //     type:Array
//     //     // requied:true
//     // },
//     // asdf :[{permissionId:'',}]
// })

// const RolePermissionSchema = new mongoose.Schema({
//     role: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Role',
//     },
//     modules: [_module]
//     // permissions: [permission]
//     // permission: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'Permission',
//     // }
// },
//     { timestamps: true }
// );

// module.exports = mongoose.model('RolePermission', RolePermissionSchema);