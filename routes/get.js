const express = require("express");
const router = express.Router();
const signupModel = require("../models/signup-model");
const PropertyDetailsModel = require("../models/property-model");

router.get("/", (req, res) => {
    signupModel.find({ email: req.user_mail }).then((userData) => {
        if (userData.length) {
            PropertyDetailsModel.find().sort({ _id: -1 }).then((propertyData) => {
                res.status(200).send(propertyData)
            })
        } else {
            res.status(403).send("No such user exist with the mentioned email id")
        }
    }).catch((err) => {
        res.status(403).send(err.message)
    })
})

router.get("/search/:id", (req, res) => {
    PropertyDetailsModel.find({ _id: req.params.id }).then((propertyData) => {
        res.status(200).send(propertyData)
    }).catch(err => {
        console.log(err.message)
        res.status(400).send("no id matching with the entered id")
    })
})

module.exports = router;