//DEPENDENCIES
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

//CONFIGURATIONS
const port = process.env.PORT;
const mongodbURI = process.env.MONGO_URI;
mongoose.connection;

//DATABASE //the second argument prevents a number of warnings in Mongoose
mongoose.connect(
    mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, 
    () => {
        console.log(`the connection with mongod is established at ${mongodbURI}`.brightMagenta)
    }
);



const purchases = require('./controllers/purchases');
app.use('/purchases', purchases) 



app.listen(port, () => {
    console.log(`App is running on port ${port}`.cyan.bold)
})