const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    productname:{
        type:String
    },
    productid:{
        type:Number
    },
    productprice:{
        type:Number
    },
    productavatar:{
        type:String
    },
    quantity:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //name of model to be linked
        ref:'User'
    }
},{
    timestamps:true
});
const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;