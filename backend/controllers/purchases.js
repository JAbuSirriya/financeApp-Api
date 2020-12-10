const express = require('express');
const router = express.Router();

//index route
router.get('/', (req, res) => res.send('index route'));

//post route 
router.post('/', (req, res) => {
    res.send('post purchase')
});


//detete route
router.delete('/:id', (req, res) => {
    res.send('purchase deleted')
});




module.exports = router;
