const crypto=require('crypto');
const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require("../model/usermodel");
const AppError=require('./../utils/apperror');
const catchAsync=require('./../utils/catchasync');


exports.adminuserupdate=catchAsync(async (req,res,next) =>{
    req.body.profilepicture='';
    if(req.file){
        req.body.profilepicture=req.file.filename;
    }
    const updateUser=await User.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    console.log(updateUser);
    if(!updateUser){
        return next(new AppError("Invalid userid", 404));
    }
    res.status(200).json({
        status:"success",
        data:{
            updateUser
        }
    });

    return next();
  });

exports.userdelete=catchAsync(async (req,res,next) =>{
    const deleteuser=await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success"
    })
    return next();
});