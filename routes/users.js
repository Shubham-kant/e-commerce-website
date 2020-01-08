const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller.js');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);






console.log('user router is working fine');
module.exports=router;