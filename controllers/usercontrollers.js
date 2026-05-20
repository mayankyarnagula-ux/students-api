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
//read single data
const Read=async(req,res)=>{

    try{
   

        const user = await User.findById(req.params.id);
       res.send(user);



    }catch(err){
    console.log(err)
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

module.exports={Addstudent,Delete,Update,Read,Sread}

