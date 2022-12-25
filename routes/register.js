const express = require('express')
const bcrypt = require('bcrypt');
const signInModel = require('../models/signup-model')
const saltRounds = 10;

const router = express.Router()
/**
 * Register an user
 */

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    let user_data = await signInModel.findOne({ email })
    if (user_data) return res.send("User already exists")
    else {
        bcrypt.hash(password, saltRounds).then(function (hash) {
            // Store hash in your password DB.
            user_data = signInModel({
                email: email,
                password: hash
            })
            user_data.save().then((data) => {
                console.log(hash);
                res.send("User created successfully");
            }).catch((e) => {
                res.status(400).send(e.message)
            })
        })
    }
})

module.exports = router