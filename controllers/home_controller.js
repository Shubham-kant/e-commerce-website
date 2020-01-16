const Product=require('../models/product');

module.exports.home=function(req,res){
    Product.find({},function(err,products){
        if(err){
            console.log('error in finding the products');
            return;
        }
        return res.render('home',{
            products:products
        });
    });

    




}