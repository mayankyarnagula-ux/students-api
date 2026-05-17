const mongoose = require("mongoose");
const { type } = require("node:os");

const userschema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    age:{
        type:Number,
     
    }, 
    email:{
        type:String,
      
    }
})

module.exports = mongoose.model("User",userschema);