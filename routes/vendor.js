const express=require('express');
const router=express.Router();
const vendorController=require('../controllers/vendor_controller.js');


router.get('/product-insertion-page',vendorController.productAdd);
router.post('/product-insertion-page/create',vendorController.create);

module.exports=router;