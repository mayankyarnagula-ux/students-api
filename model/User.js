const mongoose = require("mongoose");
const { type } = require("node:os");

const userschema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    
    email:{
        type:String,
      
    },
    password:{
        type:String,
    }
})

module.exports = mongoose.model("User",userschema);