const Category = require("../models/category")



exports.createCategory=async(req,res)=>{
    const category=new Category(req.body)
    if(category){
       try{
        const element=await category.save()
        res.send(element)
       }catch(err){console.log(err.message)}
    }
}
exports.updateCategory=async(req,res)=>{
    let category=req.category
    try{
        category.name=req.body.name
        const element=await category.save()
        res.send(element)
        
        }catch(err){console.log(err.message)}
   
}
exports.deleteCategory=async(req,res)=>{
    let category=req.category
    try{
        await Category.deleteOne(category)
        res.send('deleted')
        
        }catch(err){console.log(err.message)}
   
}

exports.allCategories=async(req,res)=>{
    try{
    const categories=await Category.find()
    res.send(categories)
    }catch(err){console.log(err.message)}
}

exports.getCategoryById=async(req,res,next,id)=>{
    try{
        const category=await Category.findById(id)
        req.category=category
        next()
    }catch(err){console.log(err.message)}
}

exports.showCategory=(req,res)=>{
    res.send(req.category)
}