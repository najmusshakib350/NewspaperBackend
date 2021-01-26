const mongoose=require('mongoose');
const dateFormat = require("dateformat");

const postscreate = new mongoose.Schema({
        post_title:{
            type:String,
            required:[true, 'Post must have a post title']
        },
        post_desc:{
            type:String,
            required:[true,'Post must have a post description']
        },
        thumbnail:String,
        tags:{
            type:String
        },
        category_name:{
             type:String
        },
        category_id:{
            type:String,
            default:0,
        },
        author_id:{
            type:Number,
            default:0
        },
        author_name:{
            type:String,
            required:[true, 'Post must have a author name']
        },
        post_date:{
            type:Date
        }
});

postscreate.pre('save', function(next){
    this. post_date = new Date();
    next();
});
postscreate.pre(/^find/, function(next){
    this. post_date = new Date();
    next();
});

const  Posts=mongoose.model('Post', postscreate);

module.exports=Posts;
