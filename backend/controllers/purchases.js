const express = require('express');
const colors = require('colors');
const router = express.Router();
const Purchase = require('../models/Purchase')


//index route (GET REQUEST)
router.get('/', (req, res) => {
    Purchase.find({}, (error, foundPurchases) => {
        if (error) {
            res.send(400).json({error: error.message})
        } else {
            res.send(200).json({
                count: foundPurchases.length,
                data: foundPurchases
            })
        }
    })
});


//detete route
router.delete('/:id', (req, res) => {
    res.send('purchase deleted')
});




module.exports = router;
