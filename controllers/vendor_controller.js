const Product=require('../models/product');
const path=require('path');
const {v4 : uuidv4} = require('uuid');
// import { nanoid } from 'nanoid'
const AVATAR_PATH=path.join('/uploads/products/avatars');
// const nanoid = require('nanoid');   
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3();
module.exports.productAdd=function(req,res){
    return res.render('vendor-product-add',{
        unique_id : uuidv4()
    });
}
/*
module.exports.avatarUpload=function(req,res,product){
    Product.uploadedAvatar(req,res,function(err){
        if(err){
            console.log("****************multer error");
            return;
        }
        if(req.file){
            product.avatar=Product.avatarPath+'/'+req.file.fieldname;
        }
        product.save();
    })




}
*/

module.exports.create=async function(req,res){
    // console.log('req.body::',req.body);
    console.log(req.params);
    Product.create({
        unique_id : req.params.unique_id,
        product_id:req.body.productid,
        name:req.body.name,
        price:req.body.price,
        type:req.body.type,
        subtype:req.body.subtype,
        description:req.body.description,
        manufacturer:req.body.manufacturer,
        detaildescription:req.body.detaildescription,
        highlights:req.body.highlights,
        stock:req.body.stock,
        avatar:AVATAR_PATH+'/'+req.file.filename
       // avatar:Product.avatarPath+'/'+req.file.fieldname

    },function(err,product){
        if(err){
            console.log('error in creating a product::',err);
            return;
        }
        //avatarUpload(product);
        console.log('no error in creating new product');
        return res.redirect('/vendor/product-insertion-page');
    })
    // upload to s3
    //await uploadToS3(req, res);
}

// async function uploadToS3(req, res) {
//     // curl -i https://some-app.cyclic.app/myFile.txt
//     let filename = req.file.fieldname + '_' + req.body.productid; 
//     console.log('filename in put::',filename);
//     console.log(typeof req.body);
//     await s3.putObject({
//         Body: JSON.stringify(req.body),
//         Bucket: 'cyclic-pear-better-narwhal-ap-northeast-1',
//         Key: filename,
//     }).promise();

//     res.set('Content-type', 'text/plain')
//     res.send('ok').end()
// }