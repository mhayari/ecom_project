const braintree = require("braintree");
require('dotenv').config()

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHAND_ID,
  publicKey:process.env.BRAINTREE_Public_Key,
  privateKey: process.env.BRAINTREE_Private_Key
});


exports.generateToken=(req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).json({error:err})
        }
      res.json({token:response.clientToken});
      
    });
  };

  exports.processPayment=(req,res)=>{
    let {amount,paymentMethodNonce}=req.body
    gateway.transaction.sale({
      amount:amount,
      paymentMethodNonce:paymentMethodNonce,options:{
        submitForSettlement:true
      }
    },(err,result)=>{
      if(err){
        return res.status(500).send(err)
      }
      res.send(result)
    })
  }