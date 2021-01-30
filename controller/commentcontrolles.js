const Comments =require('./../model/comment');
const catchasync=require('./../utils/catchasync');
const factory=require('./factorycontrolles');


exports.postcomments= factory.addOne(Comments, "");
exports.getallcomments=catchasync(async (req,res,next) =>{ 
    const data=await Comments.find({});
    res.status(200).json({
        status:"succes",
        data
    });
    return next();
})

exports.commentdelete= factory.deleteOne(Comments, "");