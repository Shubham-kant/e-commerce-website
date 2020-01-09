const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/user_controller.js');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect:'/users/sign-in'
    },
    ),userController.createSession);





console.log('user router is working fine');
module.exports=router;