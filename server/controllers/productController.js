const formidable = require('formidable');
const fs = require('fs');
const Joi=require('joi')
const Product = require("../models/product")
const _=require('lodash')
const mongoose=require('mongoose')


//Create
exports.createProduct=(req, res, next) => {
  let form=new formidable.IncomingForm()
  form.keepExtensions=true

  form.parse(req,(err,fields,files)=>{
    if(err){
      return res.status(400).json({
        error:'image could not uploaded !'
      })
    }

    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity 
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

      let product=new Product(fields)
      if(files.photo){
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size',
          });
        }
        product.photo.data=fs.readFileSync(files.photo.filepath)
        product.photo.contentType=files.photo.mimetype
      }
      // const schema=Joi.object({
      //   name:Joi.string().required(),
      //   description:Joi.string().required(),
      //   category:Joi.required(),
      //   quantity:Joi.required(),
      //   price:Joi.required(),
      //   shipping:Joi.required()
      // })
      // const {error}=schema.validate(fields)
      // if(error){
      //   return res.status(400).json({
      //     error:error.details[0].message
      //   })
      // }
      product.save((err,product)=>{
        if(err){
          return res.status(400).json({err:'product not persist'})
        }
        res.json({product})
      })
    
  })
}

//Update
exports.updateProduct=(req, res, next) => {
  let form=new formidable.IncomingForm()
  form.keepExtensions=true

  form.parse(req,(err,fields,files)=>{
    if(err){
      return res.status(400).json({
        error:'image could not uploaded !'
      })
    }
      let product=req.product
      product=_.extend(product,fields)

      if(files.photo){
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size',
          });
        }
        product.photo.data=fs.readFileSync(files.photo.filepath)
        product.photo.contentType=files.photo.mimetype
      }
      const schema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        category:Joi.required(),
        quantity:Joi.required(),
        price:Joi.required(),
        shipping:Joi.required()
      })
      const {error}=schema.validate(fields)
      if(error){
        return res.status(400).json({
          error:error.details[0].message
        })
      }
      product.save((err,product)=>{
        if(err){
          return res.status(400).json({err:'product not updated'})
        }
        res.json({product})
      })
    
  })
}


//ProductId
exports.ProductByID=async(req,res,next,id)=>{
  try{
  const product= await Product.findById(id).populate('category')
  req.product=product
  next()
}catch(err){console.log(err.message)}
}

exports.showProduct=(req,res)=>{
  req.product.photo=undefined
  res.json(req.product)
}

exports.deleteProduct=async(req,res)=>{
  let product=req.product
  try{
    await Product.deleteOne(product)
    res.send('done')
  }catch(err){console.log(err.message)}
}

exports.allProducts=async(req,res)=>{
  let sortBy=req.query.sortBy?req.query.sortBy:'_id'
  let order=req.query.order?req.query.order:'asc'
  let limit=req.query.limit?parseInt(req.query.limit):100
  let query={}
  let {search,category}=req.query
  if(search){
    query.name={$regex:search,$options:'i'}
  }
  if(category){
    query.category=category
  }
  
  try{
  const products=await Product.find(query)
                      .select("-photo")
                      .populate('category')
                      .sort([[sortBy,order]])
                      .limit(limit)
         res.send(products)
                }catch(err){console.log(err.message
                  )}

}



exports.relatedProduct=async(req,res,next)=>{
  let limit=req.query.limit?parseInt(req.query.limit):4
  try{
 const categoryProduct=await Product.find({category:req.product.category,_id:{$ne:req.product._id}}).select('-photo').limit(limit).populate('category','_id name')
 res.send(categoryProduct)
  }catch(err){console.log(err.message)}
}

exports.searchProduct = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photoProduct=(req,res)=>{
  const {data,contentType}=req.product.photo
  if(data){
    res.set('Content-Type',contentType)
    res.send(data)
  }
}