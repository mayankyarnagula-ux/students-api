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

module.exports={Addstudent}

