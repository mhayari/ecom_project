const router=require('express').Router()
const { getOneUser, updateProfile } = require('../controllers/userController')
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth')
const { getUserById } = require('../middlewares/users')

router.get('/:userId',requireSignIn,isAuth,getOneUser)
router.put('/:userId',requireSignIn,isAuth,updateProfile)
router.param('userId',getUserById)


module.exports=router