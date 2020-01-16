const Product=require('../models/product');

module.exports.productAdd=function(req,res){
    return res.render('vendor-product-add');
}
module.exports.create=function(req,res){
    console.log(req.body);
    Product.create({
        product_id:req.body.productid,
        name:req.body.name,
        price:req.body.price,
        type:req.body.type,
        subtype:req.body.subtype,
        description:req.body.description,
        manufacturer:req.body.manufacturer,
        stock:req.body.stock

    },function(err,product){
        if(err){
            console.log('error in creating a product');
            return;
        }
        return res.redirect('/vendor/product-insertion-page');
    })



}