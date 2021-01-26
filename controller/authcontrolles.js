const crypto=require('crypto');
const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const sharp=require('sharp');
const User=require("../model/usermodel");
const Email =require('./../utils/email');
const AppError=require('./../utils/apperror');
const catchAsync=require('./../utils/catchasync');





const multerStorage= multer.memoryStorage();

const multerFilter= (req, file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError('Not an image! please upload only images',400), false);
    }
}
const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

exports.uploadpostthumnail=upload.single('profilepicture');

exports.postthumnailimage=catchAsync(async (req,res,next) =>{
    if(!req.file) return next();

    req.file.filename=`${Math.random()}.jpeg`;

    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({ quality: 90})
    .toFile(`public/image/users/${req.file.filename}`)
    return next();
});


const signToken=id =>{
  return jwt.sign({id}, process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_IN
  });
};

const createSendToken=(user,statusCode,res) =>{
    const token=signToken(user._id);

    const cookieOptions={
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    };
  if(process.env.NODE_ENV==='production') cookieOptions.secure=true;
    res.cookie('jwt', token,cookieOptions);
    user.password=undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    });
};

exports.signup=catchAsync(async (req,res,next) =>{
  if(req.body.userrole==='Admin'){
      req.body.userrole='Pending Admin'
  }
  req.body.profilepicture='';
  if(req.file){
      req.body.profilepicture=req.file.filename;
  }
  const newUser=await User.create(req.body);
  const url = `${req.protocol}://${req.get('host')}/loginme`;
  await new Email(newUser, url).sendWelcome();
  res.status(201).json({
      status:"success",
      data:{
          newUser
      }
  })

});


exports.login= catchAsync(async (req,res,next) =>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new AppError('Please provide email and password!', 400));
    }
      const user=await User.findOne({email}).select('+password');
      if(!user || !(await user.correctPassword(password,user.password))){
          return next(new AppError('Incorrect email or password', 401));
      }
      user.userstatus="Active";
      const activeuser=await User.findByIdAndUpdate(user._id, user,{
          new:true,
          runValidators:true
      });
      createSendToken(user,200,res);
});

exports.logout = async (req, res) => {
    req.user.userstatus="Inactive";
    const activeuser=await User.findByIdAndUpdate(req.user._id, req.user,{
        new:true,
        runValidators:true
    });
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ 
      status: 'success' 
  });
  return next();
};

exports.protect=catchAsync(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }else if (req.cookies.jwt) {
        token = req.cookies.jwt;
        }
    if(!token){
        return next(new AppError('you are not looged in! please login to get access.',401));
    }
    //2) Verification token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const freshUser= await User.findById(decoded.id);
    if( !freshUser ){
        return next(new AppError('The user belogging to this token does no longer exist.',401));
    }

    if(freshUser.changedPassword(decoded.iat)){
        return next(new AppError('User recently changed password Please log in again', 401));
    }
    req.user=freshUser;
    res.locals.user=freshUser;
    next();
});


exports.restrictTo= (...roles) =>{
  return (req,res,next) =>{
      if(!roles.includes(req.user.userrole)){
          return next(
              new AppError('You do not have permission this action', 403)
          );
      }
      next();
  };
};


  







    



