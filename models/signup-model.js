const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const signupmodel = mongoose.model("user",Userschema)

module.exports = signupmodel