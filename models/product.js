const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
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
    manufacturer:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true

    }
    //avatar
    

},{
    timestamps:true
});
const Product=mongoose.model('Product',productSchema);
module.exports=Product;