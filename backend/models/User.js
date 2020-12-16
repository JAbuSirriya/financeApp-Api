const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: [true, "Email should be required"],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Email is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
