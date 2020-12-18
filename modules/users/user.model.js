const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        dropDups: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        dropDups: true
    },
    country: {
        type: String,
        trim: true,
    },
    region: {
        type: String,
        trim: true,
    },
    district: {
        type: String,
        trim: true,
    },
    ward: {
        type: String,
        trim: true,
        // required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    firstTimeLoginStatus: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    /*
     *for first login, before user changes password, firstTimeLoginStats is set to 0
     *after resetting password, the firstTimeLoginStats is set to 1 
     */
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'role'
    },
    forgotPasswordID: {
        type: String,
        trim: true,
    },
    invited: {
        type: Boolean,
        default: false,
        required: true
    },
    aproved: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
        //0 NOT APROVED
        //1 ACTIVE
    }, verifiedAt: {
        type: Date
    }, authToken: {
        type: String,
        select: false,
        default: null
    }
},
    { timestamps: true }
)
// userSchema.virtual('fullName').get(function () {
//     console.log('names', this.firstName)
//     return firstName + ' ' + lastName;
// });
// userSchema.set('toObject', { virtuals: true });
// userSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('users', userSchema)