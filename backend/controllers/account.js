const express = require('express');
const router = express.Router();
const Account = require('../models/Account')


//index route (GET REQUEST)
router.get('/', (_, res) => {
    Account.findOne({}, (error, accountData) => {
        if (error) {
            return res.status(400).json({message: error.message})
        } else {
            return res.status(200).json(accountData);
        }
    })
});


module.exports = router;