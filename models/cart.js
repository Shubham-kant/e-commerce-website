/*
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
*/
module.exports=function Cart(oldCart){
    this.items=oldCart.items || {};
    this.totalPrice=oldCart.totalPrice || 0;
    this.totalQty=oldCart.totalQty || 0;

    this.add=function(item,id){
        var storedItem=this.items[id];
        if(!storedItem){
            storedItem=this.items[id]={item:item,qty:0,price:0}
        }
        storedItem.qty++;
        storedItem.price=storedItem.item.price*storedItem.qty;
        this.totalQty+=1;
        this.totalPrice+=storedItem.item.price;
    }
    this.generateArray=function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.item[id]);
        }
        return arr;
    }
}