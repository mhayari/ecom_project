const {Order}=require('../models/order')


exports.create=(req,res)=>{
  // console.log('CREATE ORDER: ', req.body);
  req.body={...req.body,user:req.profile};
  const order = new Order(req.body);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error:error
      });
    }
    res.json(data);
    console.log(15,order)
  });
}

exports.listOrders=async(req,res)=>{
  try{
    const listOrders=await Order.find({}).populate('user','_id name email').sort('-createdAt')
    res.send(listOrders)
  }catch(err){console.log(err.message)}
}


exports.getStatus=async(req,res)=>{
  try{
    const orderValue=Order.schema.path('status').enumValues
    res.send(orderValue)
  }catch(err){console.log(err.message)}
}

exports.updateOrder=async(req,res)=>{
  try{
  const upOrder= await Order.updateOne({_id:req.order._id},{$set:{status:req.body.status}})
  res.send(upOrder)
  }catch(err){console.log(err.message)}
}