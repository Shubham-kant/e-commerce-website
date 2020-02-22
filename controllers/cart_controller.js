const Cart=require('../models/cart');
const User=require('../models/user');
const Product=require('../models/product');

module.exports.addProductsInCart=function(req,res){
    console.log(req.user._id," ",req.params.id);
   
            User.findById(req.user._id,function(err,userOnline){
                if(err){
                    console.log('error in finding the user to add his products');
                    return;
                }
                if(userOnline){
                    Product.findById(req.params.id,function(err,product){
                        console.log(req.params.id);
                        if(err){
                            console.log('error in finding the product to be inserted.');
                            return;
                        }
                        Cart.create({
                            productname:product.name,
                            productid:product.product_id,
                            productprice:product.price,
                            productavatar:product.avatar,
                            quantity:1,
                            user:req.user._id
                        },function(err,cartProduct){
                            if(err){
                                console.log('error in creating and inserting  a product in cart');
                                return;
                            }
                            //console.log(userOnline);
                            //console.log(cartProduct);
                            const userOnline_object=userOnline.toObject();
                            const cartProduct_object=cartProduct.toObject();
                            userOnline.productcart.push(cartProduct);
                          //  console.log(userOnline.productcart);
                            //userOnline_object.markModified('productcart');
                            //console.log("before",userOnline_object);
                            //userOnline=userOnline_object;
                            
                            //userOnline.productcart.push(cartProduct);
                            userOnline.save();
                            
                            console.log("after",userOnline);
                            //console.log("yoyo",cartProduct_object);
                        });
                        
                    });

                    return res.redirect('/'); 
                }
                else{
                    console.log("user unauthorized");
                    return res.redirect('/users/sign-in');
                }
                //userOnline.save();

            });       
            
    }



/*
module.exports.addProductsInCart=function(req,res){
    User.findById(req.params.id,function(err,userOnline){
        if(err){
            console.log('error in finding user while adding products');
            return;
        }
        console.log("yo yo",userOnline);
        return res.redirect('/');
    })
}
*/
module.exports.cartPage=function(req,res){
    /*User.findById(req.params.id,function(err,user){
        if(err){
            console.log('error in findind user while displaying products on his cart');
            return;
        }
        return res.render('cart-page',{
            user:user
        });
    });*/
    User.findOne({_id:req.params.id})
    .populate('productcart')
    .exec(function(err,user){
        
        if(err){
            console.log('error in finding user while displaying products on his cart');
            return;
        }
        //const user_object=user.toObject();
        console.log(user);
        return res.render('cart-page',{
            user:user
        });

    })
    
   /*
   Cart.find({user:req.params.id},function(err,cartProducts){
       if(err){
           console.log('error in fetching products while displaying');
           return;
       }
       return res.render('cart-page',{
        productcart:cartProducts
    });

   })
   */
}