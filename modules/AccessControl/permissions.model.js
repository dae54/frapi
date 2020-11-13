const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    genericName: {
        type: String,
        required: true,
        unique: true
    },
    moduleName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('permission', PermissionSchema);


// const mongoose = require('mongoose')

// let permission = mongoose.Schema({
//     // _id:{
//     //     type:Number,
//     //     required:true
//     // },
//     displayName: {
//         type: String,
//         required: true,
//     },
//     genericName: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         trim: true
//     }
// })


// const PermissionSchema = new mongoose.Schema({

//     onModel: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     permissions: [permission]
// },
//     { timestamps: true }
// );

// module.exports = mongoose.model('Permission', PermissionSchema);





/*
let permission = mongoose.Schema({
    // _id:{
    //     type:Number,
    //     required:true
    // },
    displayName: {
        type: String,
        required: true,
    },
    genericName: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        trim:true
    }
})


const PermissionSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    permissions: [permission]
},
    { timestamps: true }
);

*/