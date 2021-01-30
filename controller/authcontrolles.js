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
        status:'succes',
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
  await new Email(newUser, url,"empty").sendWelcome();
  res.status(201).json({
      status:"succes",
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
      status: 'succes' 
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


exports.forgotPassword = catchAsync( async (req,res,next)=>{
    //1) Get user based on Posted Email
    const user= await User.findOne({ email: req.body.email });

    if(!user){
        return next( new AppError('There is no user with email address', 404) );
    }
    //2)Generat the random reset token
    const resetToken= user.creatPasswordResetToken();

    await user.save({validateBeforeSave: false});
    //3) Send it to user's email
  try{
    const resetURL=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    await new Email(user, resetURL,resetToken).sendPasswordReset();
    res.status(200).json({
        status:'succes',
        message:'Token sent to email',
    });
  }catch(err){
      user.passwordResetToken=undefined;
      user.passwordResetExpires=undefined;
      await user.save({validateBeforeSave: false});

      return next(new AppError('There was an error sending the email. Try again later', 500));
  }
});

exports.resetPassword= catchAsync( async (req,res,next)=>{
    //Get user based on the token
    const hashedToken=crypto.createHash('sha256').update(req.params.password).digest('hex');
    console.log(hashedToken);
    const user = await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    });
    //if token has not expired, and there is user, set the new password
    if(!user){
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password=req.body.password;
    user.confirmPassword=req.body.confirmPassword;
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save();
    createSendToken(user,200,res);
});

  







    



