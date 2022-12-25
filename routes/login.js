const express = require('express')
const bcrypt = require('bcrypt');
const signInModel = require('../models/signup-model')
var jwt = require('jsonwebtoken');

const router = express.Router()

/**
 * Login an user
 */
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    let user_data = await signInModel.findOne({ email })
    if(user_data){
        bcrypt.compare(password, user_data.password, function (err, result) {
            // result == true
            if (result) {
                const token = jwt.sign(user_data.email, process.env.SECRET_KEY)
                return res.send({token})
            }
            else {
                return res.status(401).send("Invalid password")
            }
        });
    }else{
        return res.status(404).send("No user found")
    }
})

router.post('/logout',async(req,res)=>{
    token = "";
    res.status(200).send("loggedout successfully")
})

module.exports = router