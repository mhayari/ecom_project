const User = require("../models/user")

exports.getUserById=async(req,res,next,id)=>{
    try{
   const userId=await User.findById(id)
        if(!userId){
          return  res.status(400).send('user not found')
        }
        req.profile=userId
    }catch(err){console.log(err.message)}
        next()
    
}

exports.addProductToUserHistory=(req,res,next)=>{
  let history=[]
  history=req.body.products.map(product=>{
    return {
      _id:product._id,
      name:product.name,
      description:product.description,
      quantity:product.count,
      amount:product.price*product.count,
      transact_id:req.body.transaction_id
    }
  })
if(history.length){

  User.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{new:true},(err,data)=>{
    if(err){
      return res.status(400).json({error:'could not update user History !'})
    }
   return next()
  })
}
next()
}

