
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
        if(cart.totalQty>0){
            res.locals.isCart=true;
        }
        console.log(req.session.cart);
        console.log(cart.totalQty," ",res.locals.isCart)
        console.log("session:::::::",req.session);
        console.log(req.session.cart.items);
        //console.log('generated array',cart.generateArray());
        return res.redirect('/');
    });

}
module.exports.cartPage=function(req,res){
    if(!req.session.cart){
        return res.render('cart-page',{
            products:null
        });
    }
    var cart=new Cart(req.session.cart);
    
    return res.render('cart-page',{
        products:cart.generateArray(),
        totalPrice:cart.totalPrice,
        totalQty:cart.totalQty
    })
}
module.exports.checkout=function(req,res){
    if(!req.session.cart){
        return res.redirect(back);
    }
    var cart=new Cart(req.session.cart);
    return res.render('checkout',{
        totalPrice:cart.totalPrice
    })


}