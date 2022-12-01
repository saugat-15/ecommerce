const express = require("express");
const User = require('../Model/userSchema')
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)
    try{
        const user = User.create(req.body);
        if(user){
            res.json({
                message: 'user successfully registered',
                details: user
            })
        }
    }catch(error){
        res.send({
            message: 'Invalid creds'
        })
    }
})
module.exports = router;