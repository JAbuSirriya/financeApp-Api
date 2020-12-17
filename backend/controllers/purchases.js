const express = require('express');
const colors = require('colors');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Account = require('../models/Account');
const authMw = require('../middlewares/auth');
const { Types } = require('mongoose');


//index route (GET REQUEST)
router.get('/', authMw,  (req, res) => {
    Purchase.find({
        userId: req.user.id
    }, (error, foundPurchases) => {
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
router.post('/', authMw, (req, res) => {
    const { id } = req.user;
    console.log('user is', id);
    const { accountType } = req.body;
    Purchase.create({...req.body, userId: Types.ObjectId(id)}, (error, createdPurchase) => {
        // if (error.name === 'Purchase validation failed') {
        if (error) {
            console.log(error.name)
            res.status(400).json({error: error.message});

        } else {
            const isExpense = req.body.description.includes('bought');
            
            const amount = !isExpense ? +req.body.amount : -req.body.amount;
            const expenseIncomePayload = isExpense ? {
                "expenses": req.body,
            }: {

             "income": req.body,
            };

            let balanceAccount = {};

            switch(accountType){
                case 'checking': 
                    balanceAccount ={
                        
                        "checkingBalance": amount,
                        
                      }
                    break;
                case 'saving':
                    balanceAccount ={
                        "savingBalance": amount,
                        
                    }
                    break;
                case 'cash':
                    balanceAccount ={
                        
                        "cashOnHandBalance": amount
                      }
                    break;
                default:
                    // do nothing



            }
            const newAccData = {
                "$inc": balanceAccount,
                  "$push": expenseIncomePayload
            };
            Account.findOneAndUpdate({
                userId: id
            }, newAccData, { returnNewDocument: true }).then(updatedDocument => {
                if(updatedDocument) {
                  console.log(`Successfully updated document: ${updatedDocument}.`)
                } else {
                  console.log("No document matches the provided query.")
                }
                return updatedDocument
              })
            res.status(201).json(createdPurchase)
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
