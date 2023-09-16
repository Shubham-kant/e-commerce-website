const mongoose=require('mongoose');
const multer=require('multer');
// const express = require('express');
// const app=express();
const path=require('path');
const AVATAR_PATH = path.join('/uploads/products/avatars');

// const AWS = require("aws-sdk");
// const s3 = new AWS.S3();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json())
const productSchema=new mongoose.Schema({
    unique_id: {
      type:String,
    },
    product_id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    subtype:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    detaildescription: {
        type:String,
        required:true
    },
    highlights: {
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true

    },
    avatar:{
        type:String
    }
    

},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        //cb=callback functionp
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+req.params.unique_id);
    }
});



// curl -i https://some-app.cyclic.app/myFile.txt
// app.get('*', async (req,res) => {
//     let filename = req.path.slice(1);
//     console.log('filename in get::',filename);

//   try {
//     let s3File = await s3.getObject({
//       Bucket: 'cyclic-pear-better-narwhal-ap-northeast-1',
//       Key: filename,
//     }).promise()

//     res.set('Content-type', s3File.ContentType)
//     res.send(s3File.Body.toString()).end();
//   } catch (error) {
//     if (error.code === 'NoSuchKey') {
//       console.log(`No such key ${filename}`)
//       res.sendStatus(404).end();
//     } else {
//       console.log(error);
//       res.sendStatus(500).end();
//     }
//   }
// })


// // curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://some-app.cyclic.app/myFile.txt
// app.put('*', async (req,res) => {
//   let filename = req.path.slice(1);
//   console.log('filename in put::',filename);
//   console.log(typeof req.body)

//   await s3.putObject({
//     Body: JSON.stringify(req.body),
//     Bucket: 'cyclic-pear-better-narwhal-ap-northeast-1',
//     Key: filename,
//   }).promise()

//   res.set('Content-type', 'text/plain')
//   res.send('ok').end()
// })


// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
// app.use('*', (req,res) => {
//   res.sendStatus(404).end();
// })

// /////////////////////////////////////////////////////////////////////////////
// // Start the server
// const port = process.env.PORT || 3000
// app.listen(port, () => {
//   console.log(`index.js listening at http://localhost:${port}`)
// })


//static methods
productSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
productSchema.statics.avatarPath=AVATAR_PATH;



const Product = mongoose.model('Product',productSchema);
module.exports = Product;