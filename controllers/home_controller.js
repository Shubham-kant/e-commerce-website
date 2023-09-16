const Product=require('../models/product');
const Cart=require('../models/cart');
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3();
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
module.exports.productDescription = async function(req,res){
    var productId = req.params.id;
    let productInCart = false;
    console.log(productId,'product id');
    Product.findById(productId,async function(err,product){
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
            //product.avatarS3 = await getAvatar(req,res,product);
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

// async function getAvatar(req,res,product) {
//     console.log('req.path::',req.path);
//     let filename = req.path.slice(1);
//     // let filename = 
//     console.log('filename in get::',filename);

//   try {
//     let s3File = await s3.getObject({
//       Bucket: 'cyclic-pear-better-narwhal-ap-northeast-1',
//       Key: filename,
//     }).promise()

//     res.set('Content-type', s3File.ContentType);
//     console.log(s3File.Body.toString());
//     res.send(s3File.Body.toString()).end();
//     return s3File.Body.toString();
//   } catch (error) {
//     if (error.code === 'NoSuchKey') {
//       console.log(`No such key ${filename}`)
//       res.sendStatus(404).end();
//     } else {
//       console.log(error);
//       res.sendStatus(500).end();
//     }
//   }
// }

