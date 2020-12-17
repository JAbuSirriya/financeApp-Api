const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const authMw = require('../middlewares/auth');

//index route (GET REQUEST)
router.get('/', authMw, (req, res) => {
    Account.findOne({
        userId: req.user.id
    }, (error, accountData) => {
        if (error) {
            return res.status(400).json({message: error.message})
        } else {
            return res.status(200).json(accountData);
        }
    })
});

router.post('/', (req, res) => {
    Account.create(req.body, (error, accountData) => {
        if (error) {
            return res.status(400).json({message: error.message})
        } else {
            return res.status(201).json(accountData);
        }
    })
});


module.exports = router;