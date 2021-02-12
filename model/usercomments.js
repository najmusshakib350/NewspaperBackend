const mongoose=require('mongoose');
const validatoremail=require('validator');

const commentitem=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please provide your email..!'],
        validate:[validatoremail.isEmail, "Please provide your valid email"],
        unique:true
    },
    name:{
        type:String,
        required:[true,'please provide your name..!']
    },
    comdesc:{
        type:String,
        required:[true,"Comment can not be empty"]
    },
    comdat:{
        type:Date,
        default:Date.now
    },
});
const Usercomments= mongoose.model('Usercomments',commentitem);

module.exports=Usercomments;