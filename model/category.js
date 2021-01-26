const mongoose=require('mongoose');

const categoryitem=new mongoose.Schema({
    catname:{
        type:String,
        required:[true, 'Categoryname must have a name']
    },
    catdes:{
        type:String,
        required:[true,'Category description must contain description']
    },
    parentstatus:{
        type:String,
        default:'primary category'
    },
    catdat:{
        type:Date
    },
  
    parentid:{
        type:String
    }
});

categoryitem.pre('save', function(next){
    this.catdat = new Date();
    next();
});

const Category= mongoose.model('Category',categoryitem);

module.exports=Category;