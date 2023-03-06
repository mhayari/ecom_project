const router=require('express').Router()
const { getUserById } = require('../middlewares/users')
const { isAuth, requireSignIn, isAdmin } = require('../middlewares/auth')
const { generateToken, processPayment } = require('../controllers/braintreeController')

router.get('/getToken/:userId',[requireSignIn,isAuth],generateToken)

router.post('/purchase/:userId',[requireSignIn,isAuth],processPayment)

router.param('userId',getUserById)


module.exports=router