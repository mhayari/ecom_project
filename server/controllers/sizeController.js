// const Size = require("../models/size")



// exports.createSize=async(req,res)=>{
//     const size=new Size(req.body)
//     if(size){
//        try{
//         const element=await size.save()
//         res.send(element)
//        }catch(err){console.log(err.message)}
//     }
// }
// exports.updateSize=async(req,res)=>{
//     let size=req.size
//     try{
//         size.size=req.body.size
//         const element=await size.save()
//         res.send(element)
        
//         }catch(err){console.log(err.message)}
   
// }
// exports.deleteSize=async(req,res)=>{
//     let size=req.size
//     try{
//         await Size.deleteOne(size)
//         res.send('deleted')
        
//         }catch(err){console.log(err.message)}
   
// }

// exports.allSizes=async(req,res)=>{
//     try{
//     const sizes=await Size.find()
//     res.send(sizes)
//     }catch(err){console.log(err.message)}
// }

// exports.getSizeById=async(req,res,next,id)=>{
//     try{
//         const size=await Size.findById(id)
//         req.size=size
//         next()
//     }catch(err){console.log(err.message)}
// }

// exports.showSize=(req,res)=>{
//     res.send(req.size)
// }