const mongoose=require('mongoose')
const Category = require('./category')


const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:150,
        trim:true
    },
    description:{
        type:String,
        require:true,
        maxLength:2000
    },
    price:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        require:true
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    shipping:{
        required:false,
        type:Boolean,
        default:false
    },
    remise:{
        type:Number
    },
    barePrice:{
        type:Number
    },
    unity:{
        type:Number
    }
},{timestamps:true})

const Product=mongoose.model('product',productSchema)
module.exports=Product