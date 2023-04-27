const Product=require('../models/product');
const Cart=require('../models/cart');

module.exports.home=function(req,res){
    Product.find({},function(err,products){
        if(err){
            console.log('error in finding the products');
            return;
        }
        console.log('home page');
        return res.render('home',{
            products:products
        });
    });
}
module.exports.productDescription = function(req,res){
    var productId = req.params.id;
    let productInCart = false;
    console.log(productId,'product id');
    Product.findById(productId,function(err,product){
        if(err){
            console.log('error in loading the project');
            return;
        }
        console.log('viewed product',product);
        console.log('added products in carts uptil now..',req.session?.cart?.items);
        let cart = new Cart(req.session.cart ? req.session.cart : {} );
        let cartItemIds = [];
        Object.values(cart.generateArray()).forEach(cartItem => {
            if(cartItem.item) {
                cartItemIds.push(cartItem?.item?._id);
            }
        });
        const productHighlights = product.highlights.split(',');
        console.log(cartItemIds);
        if(cartItemIds.find(cartItemId => cartItemId === productId)) {
            productInCart = true;
            console.log('yes matched')
            console.log(productInCart);
        }
        if(product){
            return res.render('product_description',{
                product:product,
                productHighlights : productHighlights,
                productInCart:productInCart
            });
        }
        else{
            console.log('error in loading the project');
            return;
        }
    });
}