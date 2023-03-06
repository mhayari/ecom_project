const { Order } = require("../models/order")



exports.getOrderById=async(req,res,next,id)=>{
    try{
        const orderId=await Order.findById(id)
        req.order=orderId
    }catch(err){console.log(err.message)}
    next()
}