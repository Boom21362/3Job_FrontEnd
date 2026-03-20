import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    telephone_number: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [
            /^0\d{2}-\d{7}$/,
            'Please add a valid telephone number in the format 0XX-XXXXXXX'
        ]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    specializations: [{
        type: String,
        required:[true,'Please add company\'s specializations']
    }], 
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.models.User || mongoose.model("User",UserSchema)
export default User