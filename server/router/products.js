const { createProduct, showProduct, ProductByID, deleteProduct, updateProduct, allProducts, getRelatedProduct, relatedProduct, searchProduct, photoProduct } = require('../controllers/productController')
const { isAuth, requireSignIn, isAdmin } = require('../middlewares/auth')
const { getUserById } = require('../middlewares/users')


const router=require('express').Router()


router.post('/create/:userId',[requireSignIn,isAuth,isAdmin],createProduct)

router.get('/:productId',showProduct)

router.get('/photo/:productId',photoProduct)

router.get('/',allProducts)

router.post('/search',searchProduct)

router.get('/related/:productId',relatedProduct)

router.delete('/:productId/:userId',[requireSignIn,isAuth,isAdmin],deleteProduct)

router.put('/:productId/:userId',[requireSignIn,isAuth,isAdmin],updateProduct)

router.param('userId',getUserById)

router.param('productId',ProductByID)

module.exports=router