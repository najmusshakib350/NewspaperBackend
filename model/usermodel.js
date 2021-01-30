const crypto= require('crypto');

const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const validatoremail=require('validator');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide your name..!']
    },
    email:{
        type:String,
        required:[true,'please provide your email..!'],
        validate:[validatoremail.isEmail, "Please provide your valid email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide your password'],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'please provide again your password..!'],
        validate:{
            validator: function(){
                return this.password===this.confirmPassword;
            },
            message:"Password are not the same..!"
        }
    },
    phone:{
        type:String,
        required:[true,"please provide your phone number"]
    },
    address:{
        type:String,
        required:[true, "please provide your address"]
    },
    userrole:{
        type:String,
        default:"Editor"
    },
    profilepicture:{
        type:String,
    },
    userstatus:{
        type:String,
        default:"inactive",
    },
    signupTime:{
        type:Date,
    },
    passwordResetToken:String,
    passwordResetExpires:Date
});

userSchema.pre('save',async function(next){
      if(!this.isModified('password')) return next();
      this.password=await bcryptjs.hash(this.password,12);
      this.confirmPassword=undefined;
      this.signupTime=Date.now();
      next();
});

//Instance method.....!

userSchema.methods.correctPassword=async function(password,userpassword){
        return await bcryptjs.compare(password,userpassword);
};

userSchema.methods.changedPassword=function(time){
         const timedata=parseInt(this.signupTime / 1000)
         return timedata> time;
};

userSchema.methods.creatPasswordResetToken= function(){
      const resetToken=crypto.randomBytes(8).toString('hex');
      this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
      this.passwordResetExpires=Date.now() + 10 * 60 *1000;
      return resetToken;
};

const User =mongoose.model('user', userSchema);

module.exports=User;