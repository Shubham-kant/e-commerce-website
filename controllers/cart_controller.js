
const Cart=require('../models/cart');
const User=require('../models/user');
const Product=require('../models/product');


module.exports.addProductsInCart=function(req,res){
    var product_id=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart : {} );
    Product.findById(product_id,function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product_id);
        req.session.cart=cart;
        console.log(req.session.cart);
        return res.redirect('/');
    });

}