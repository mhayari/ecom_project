const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxLength:32
    },
    },{timestamps:true}
    )

const Category=mongoose.model('Category',categorySchema)  
module.exports=Category

