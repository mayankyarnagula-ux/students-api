const User = require("../model/User");

//add
const Addstudent=async(req,res)=>{
try{

const user = new User(req.body);

await user.save();

res.send(user);
        
}catch(err){
res.send(err)
}
}

const Delete=async(req,res)=>{

  try{
   

        const user = await User.findByIdAndDelete(req.params.id);
       res.send("user deleted");



    }catch(err){
    console.log(err)
}
}

const Update=async(req,res)=>{
  
     try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )

        res.send(user);

     }catch(err){

     }

}
//register
const Register=async(req,res)=>{
    
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
        password: hashpassword
      })

      await user.save();

    }catch(err){
        console.log(err);
    }

}
//single dataread
const Sread=async(req,res)=>{
try{

    const user = await User.find();

    res.send(user);

}catch(err){
    console.log(err)
}
}
const Read=async(req,res)=>{
try{

    const user = await User.find();

    res.send(user);

}catch(err){
    console.log(err)
}
}

const Login= async(req,res)=>{
try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.end("user not found");
    }


    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        return res.end("inavlid pswrd");
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
}

module.exports={Addstudent,Delete,Update,Read,Sread,Register,Login}

