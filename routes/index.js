const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller.js');

router.get('/',homeController.home);
router.use('/users',require('./users'));





console.log('router is working fine');
module.exports=router;
