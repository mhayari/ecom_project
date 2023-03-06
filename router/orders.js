const router=require('express').Router()
const { create, listOrders, getStatus, updateOrder } = require('../controllers/orderController')
const { isAuth, requireSignIn, isAdmin } =
require('../middlewares/auth')
const { getOrderById } = require('../middlewares/order')
const { decreaseQuantity } = require('../middlewares/product')
const { getUserById, addProductToUserHistory } = 
require('../middlewares/users')

router.get('/:userId',[requireSignIn,isAuth,isAdmin],listOrders)
router.get('/status/:userId',[requireSignIn,isAuth,isAdmin],getStatus)
router.patch('/:orderId/status/:userId',[requireSignIn,isAuth,isAdmin],updateOrder)

router.post('/create/:userId',[requireSignIn,isAuth,addProductToUserHistory,decreaseQuantity],create)

router.param('orderId',getOrderById)
router.param('userId',getUserById)







module.exports=router