const express = require("express");
const User = require('../Model/userSchema')
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)
    try{
        res.send({
            message: 'logged in'
        })
    }catch{

    }
})

module.exports = router