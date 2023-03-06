const { createCategory,
     showCategory,
      getCategoryById,
       updateCategory, 
       deleteCategory,
       allCategories} = require('../controllers/categoryController')
const { isAuth, requireSignIn, isAdmin } = require('../middlewares/auth')
const { getUserById } = require('../middlewares/users')

const router=require('express').Router()


router.post('/create/:userId',[requireSignIn,isAuth,isAdmin],createCategory)

router.put('/:categoryId/:userId',[requireSignIn,isAuth,isAdmin],updateCategory)

router.delete('/:categoryId/:userId',[requireSignIn,isAuth,isAdmin],deleteCategory)

router.get('/',allCategories)

router.get('/:categoryId',showCategory)

router.param('userId',getUserById)

router.param('categoryId',getCategoryById)

module.exports=router