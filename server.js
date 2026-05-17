const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./model/User")
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(express.json());

mongoose.connect("mongodb+srv://aitam:aitam123@aitam1.w8bdswp.mongodb.net/?appName=aitam1")
.then(()=>{
    console.log("db connected")
})


app.get('/',(req,res)=>{
   res.send("Hello World")
})


app.post("/students/add",async(req,res)=>{
try{

const user = new User(req.body);

await user.save();

res.send(user);
        
}catch(err){
res.send(err)
}
})

app.listen(4000,()=>{
    console.log("server started")
})