const mongoose=require('mongoose');

const commentitem=new mongoose.Schema({
    comdesc:{
        type:String,
        required:[true,"Comment can not be empty"]
    },
    categoryid:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'Comment must belongs to a category']
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:[true,'Comment must belongs to a user']
    },
    comdat:{
        type:Date,
        default:Date.now
    },
});

commentitem.pre(/^find/, function(next){
    this.populate({
        path:'categoryid',
        select:'catname'
    }).populate({
        path:'userid',
        select:'name'
    });
    return next();
});
const Comments= mongoose.model('Comments',commentitem);

module.exports=Comments;