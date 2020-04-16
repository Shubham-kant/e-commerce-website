const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/user_controller.js');
const cartController=require('../controllers/cart_controller.js');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect:'/users/sign-in'
    },
    ),userController.createSession);

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-out',userController.destroySession);
router.get('/cart/:id',passport.checkAuthentication,cartController.addProductsInCart);
//router.get('/cartpage/:id',passport.checkAuthentication,cartController.cartPage);


console.log('user router is working fine');
module.exports=router;