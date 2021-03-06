const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    savingBalance: {
        type: Number,
        default: 0
    },
    checkingBalance: {
        type: Number,
        default: 0
    },
    cashOnHandBalance: {
        type: Number,
        default: 0
    },
    expenses: {
        type: Array,
        default: []
    },
    income: {
        type: Array,
        default: []
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'User is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
