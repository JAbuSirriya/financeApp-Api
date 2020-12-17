const express = require('express');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const router = express.Router();
const Account = require('../models/Account')

router.get('/', (_, res) => {

    User.find({}, (error, userData) => {
        if (error) {
            return res.status(400).json({message: error.message})
        } else {
            return res.status(200).json(userData.map(d => ({
                email: d.email,
                name: d.name
            })));
        }
    })
});

router.post('/login', (req, res) => {
    const payload = {
        email: req.body.email
    }
    User.findOne(payload, (error, user) => {
        if (error) {
            return res.status(400).json({message: error.message})
        } else {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            if(!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({ message: "The password is invalid" });
            }
            const token = jwt.sign({ name: user.name, id: user._id }, secretKey);
            return res.status(200).json({
                token
            });
        }
    })
});

router.post('/register', (req, res) => {
    const payload = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    User.create(payload, (error, user) => {
        if (error) {
            console.error(error);
            return res.status(400).json({message: error.message})
        } else {
            Account.create({
                userId: user._id
            }).then(() => {
                const token = jwt.sign({ name: user.name, id: user._id }, secretKey);
                return res.status(200).json({
                    token
                });
            }).catch((err) => {
                console.error(err);
                return res.status(422).json({message: error.message});
            })
            
        }
    })
});


module.exports = router;