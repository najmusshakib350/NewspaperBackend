const Comments =require('./../model/comment');
const catchasync=require('./../utils/catchasync');


exports.postcomments=catchasync(async (req,res,next) =>{
    const data=await Comments.create(req.body);
    res.status(201).json({
        status:"success",
        data
    });
    return next();
});

exports.getallcomments=catchasync(async (req,res,next) =>{
    
    const data=await Comments.find({});

    res.status(200).json({
        status:"success",
        data
    });
    return next();
})

exports.commentdelete=catchasync(async (req,res,next) =>{
    const deletecomment=await Comments.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success"
    })
    return next();
});