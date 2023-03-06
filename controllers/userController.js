const User = require("../models/user")

exports.getOneUser=((req,res)=>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    res.send(req.profile)
})


exports.updateProfile=async(req,res)=>{
    try{
    const newProfile=await User.findByIdAndUpdate(req.profile._id,req.body)
    req.hashed_password=undefined
    req.salt=undefined
    res.send(newProfile)
    }catch(err){console.log(err.message)}
}