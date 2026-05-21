const express = require('express');
const app = express();
const studentsRoutes=require("./routes/studentsRoutes")
const jwt= require("jsonwebtoken");
const User=require('./model/User')
const db=require("./config/db")
const dns = require('dns');

require('dotenv').config()
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(express.json());
app.use(studentsRoutes);

//dbconnect
db();

//---------middleware--------

const verifytoken = (req,res,next)=>{


const token = req.headers.authorization;


if(!token){
    return res.send("token misssing");
}

try{

    jwt.verify(token,"secretkey");
    next();

}catch(err){
console.log("invalid token")
}

}

app.listen(4000,()=>{
    console.log("server started")
})
