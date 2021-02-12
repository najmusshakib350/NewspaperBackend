const Usercomments=require('./../model/usercomments');
const catchasync=require('./../utils/catchasync');
const factory=require('./factorycontrolles');


exports.postusercomments= factory.addOne(Usercomments, "");

exports.showallcomments=catchasync(async (req,res,next) => {
    const commentsall= await Usercomments.find({}).sort( { comdat: -1 } );
    res.status(200).json({
        status:"succes",
        commentsall
    });
    return next();
});

exports.commentdelete= factory.deleteOne(Usercomments, "");