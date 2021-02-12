const User=require("../model/usermodel");
const AppError=require('./../utils/apperror');
const catchAsync=require('./../utils/catchasync');
const factory=require('./factorycontrolles');


exports.adminuserupdate=catchAsync(async (req,res,next) =>{
    req.body.profilepicture='';
    if(req.file){
        req.body.profilepicture=req.file.filename;
    }
    const updateUser=await User.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    if(!updateUser){
        return next(new AppError("Invalid userid", 404));
    }
    res.status(200).json({
        status:"succes",
        data:{
            updateUser
        }
    });
    return next();
  });

exports.userdelete= factory.deleteOne(User);