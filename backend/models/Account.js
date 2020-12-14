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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
