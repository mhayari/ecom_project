const {createProduct, getProductData } = require('../controllers/productController')
const { signUp, signIn, signOut } = require('../controllers/authController')
const {requireSignIn}=require('../middlewares/auth')
const { userSignupValidator } = require('../middlewares/userSignUpValidator')

const router=require('express').Router()


router.post('/signup',userSignupValidator,signUp)
router.post('/signIn',signIn)
router.get('/signOut',signOut)
router.get('/hello',requireSignIn,(req,res)=>{
    res.send('b3wid')
})






module.exports=router