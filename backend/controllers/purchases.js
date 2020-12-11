const express = require('express');
const colors = require('colors');
const router = express.Router();
const Purchase = require('../models/Purchase')


//index route (GET REQUEST)
router.get('/', (req, res) => {
    Purchase.find({}, (error, foundPurchases) => {
        if (error) {
            return res.status(400).json({error: error.message})
        } else {
            return res.status(200).json({
                success: true,
                count: foundPurchases.length,
                data: foundPurchases
            })
        }
    })
});

//post route
router.post('/', (req, res) => {
    console.log(req.body);
    Purchase.create(req.body, (error, createdPurchase) => {
        if (error.name === 'Purchase validation failed') {
            console.log(error.name)
            res.status(400).json({error: error.message});

        } else {
            res.status(200).json(createdPurchase)
        }
    })
})

//detete route
router.delete('/:id', (req, res) => {
    Purchase.findByIdAndDelete(req.params.id, (error, deletedPurchase) => {
        if (error) {
            res.status(400).json({error: error.message});
        } else {
            console.log(deletedPurchase)
            res.status(200).json(deletedPurchase)
        }
    })
});




module.exports = router;
