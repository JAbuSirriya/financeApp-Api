const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Add a description']
    },
    amount: {
        type: Number,
        required: [true, 'Add a number (example: +50 or -50)']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase
