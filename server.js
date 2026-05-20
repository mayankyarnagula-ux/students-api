const express = require('express');
const app = express();
const studentsRoutes=require("./routes/studentsRoutes")
const jwt= require("jsonwebtoken");
const User=require('./model/User')
const db=require("./config/db")
const bcrypt=require("bcrypt");
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

//app.get('/',(req,res)=>{
  // res.send("Hello World")
//})



//update
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
//res
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

//login
app.post("/login", async(req,res)=>{
try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.end("user not found");
    }


    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        return res.end("inavlid pssword");
    }

   const token = jwt.sign(
    {id:user._id},
    "secretkey",
    {expiresIn: "1h"}
   )

   res.send({
    message: "login successful",
    token
   })


   

}catch(err){
 console.log(err);
}
})


app.listen(4000,()=>{
    console.log("server started")
})