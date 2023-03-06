const expressJWT = require("express-jwt");

require('dotenv').config()


exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    // algorithms: ['RS256'],
    userProperty: 'auth',
  });

exports.isAuth=(req,res,next)=>{
  // if(req.auth.role==1){
  //   next()
  // }
  const user=req.profile&&req.auth&&(req.profile._id==req.auth._id)
  if(!user){
   return res.status(403).send('denied')
  }
  next()
}

exports.isAdmin=(req,res,next)=>{
  if(req.auth.role==0){
    res.status(403).send('not admin')
  }
  next()
}

