const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Add a description']
    },
    amount: {
        type: Number,
        required: [true, 'Add a number (example: +50 or -50)']
    },
    accountType: {
        type: String,
        required: [true, 'Account Type is required']
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

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;
