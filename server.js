const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./model/User")
const bcrypt=require("bcrypt");
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(express.json());

mongoose.connect("mongodb+srv://aitam:aitam123@aitam1.w8bdswp.mongodb.net/?appName=aitam1")
.then(()=>{
    console.log("db connected")
})


//app.get('/',(req,res)=>{
  // res.send("Hello World")
//})


app.post("/students/add",async(req,res)=>{
try{

const user = new User(req.body);

await user.save();

res.send(user);
        
}catch(err){
res.send(err)
}
})
app.get("/",async(req,res)=>{
try{

    const user = await User.find();

    res.send(user);

}catch(err){
    console.log(err)
}
})

app.put("/students/update/:id",async(req,res)=>{
  
     try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )

        res.send(user);

     }catch(err){

     }

})

//delete
app.delete("/students/:id",async(req,res)=>{

    try{
   

        const user = await User.findByIdAndDelete(req.params.id);
       res.send("user deleted");



    }catch(err){
    console.log(err)
}
})
//sign
app.post("/register", async(req,res)=>{
    
    try{

      const {name,email,password} = req.body;

      const userExists = await User.findOne({email})

      if(userExists){
        return res.end("user already in db")
      }

    
      const hashpassword = await bcrypt.hash(password,13);
      console.log("hashpassword",hashpassword)


      const user = new User({
        name,
        email,
        password:hashpassword
      })

      await user.save();

    }catch(err){
        console.log(err);
    }

})
app.listen(4000,()=>{
    console.log("server started")
})