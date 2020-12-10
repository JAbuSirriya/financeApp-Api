const express = require('express');
var colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const app = express();


const purchases = require('./controllers/purchases');
app.use('/purchases', purchases) 



app.listen(port, () => {
    console.log(`App is running on port ${port}`.cyan.bold)
})