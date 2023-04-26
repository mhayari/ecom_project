const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

//
const adminRouter=require('./router/auth')
const categoryRouter=require('./router/categories')
const productRouter=require('./router/products')
const authRouter=require('./router/auth')
const userRouter=require('./router/users')
const braintreeRoutes=require('./router/braintree')
const orderRoutes=require('./router/orders')
const app=express()
const helmet=require('helmet')


app.use(express.json())
app.use(cors())
require('dotenv').config()
app.use(expressValidator())
app.use(cookieParser());
// app.use(helmet())
app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );


mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE)
console.log('running')
//middleware router
app.use('/api',authRouter)
app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/braintree',braintreeRoutes)
app.use('/api/order',orderRoutes)



// app.use(express.static('front/build'))
// app.get('*',(req,res)=>{
//     res.sendFile(`${__dirname}/front/build/index.html`)
// })

const PORT=process.env.PORT||8000
app.listen(PORT,()=>console.log(`running ${PORT} ...`))


