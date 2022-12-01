const express = require("express");
const Products = require('../Model/productsSchema')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('products')
})

router.post('/', (req, res) => {
    
})

module.exports = router;