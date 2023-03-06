const User=require('../models/user')
const jwt = require('jsonwebtoken'); // to generate signed token



exports.signUp=async(req,res)=>{
  const user=req.body
  try{
      const result=await User.findOne({email:user.email})
      if(result){
          res.json({error:'cet utilisateur existe deeeeja'})
          console.log('cet utilisateur existe deeeeeja')
          console.log(result)
      }else{
        const newUser= new User(user)
        await newUser.save()
        newUser.hashed_password=undefined
        newUser.salt=undefined
        res.send(newUser)
        console.log(newUser)
      }
    }catch(err){res.send(err.message)}
}

exports.signIn = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email doesn't exist. Please signup.",
        });
      }
      // if user found make sure the email and password match
      // create authenticate method in user model
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password didn't match",
        });
      }
      // generate a signed token with user id and secret
      const token = jwt.sign(
        { _id: user._id,role:user.role },
        process.env.JWT_SECRET
      );
      // persist the token as 't' in cookie with expiry date
      res.cookie('token', token, { expire: new Date() + 9999 });
      // return response with user and token to frontend client
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, email, name, role } });
    });
  };

  exports.signOut=((req,res)=>{

    res.clearCookie('token')

    res.send('USer SignOut')
  })