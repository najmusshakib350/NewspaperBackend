const axios=require('axios');
const Category =require('./../model/category');
const Posts=require('./../model/posts');
const User=require("../model/usermodel");
const Comments=require("../model/comment");

const catchasync=require('./../utils/catchasync');
const { protect } = require('./authcontrolles');
exports.viewcategory=catchasync(async (req,res,next) =>{
    const delcatid= req.query.delid || '';
    const catdata= await Category.find({}); 
    res.status(200).render('category',{
        catdata,
        delcatid
    });
    return next();
});

exports.updatecategory=catchasync(async (req,res,next) => {
    const catalldata= await Category.find({}); 
    const catdata =await Category.findById(req.params.id);
    res.status(200).render('updatecategory', {
        catdata,
        catalldata
    });
    return next();
});

exports.addpost=catchasync(async (req,res,next) =>{
    const catalldata= await Category.find({}); 
    res.status(200).render('post', {
        catalldata
    });
    return next();
});

exports.viewallpost=catchasync(async (req,res,next) =>{
    const delcatid= req.query.delid || '';
    const postall= await Posts.find({});
    res.status(200).render('viewallpost',{
        postall,
        delcatid
    });
    return next();
});

exports.updatepost=catchasync(async (req,res,next) =>{
    const updatepost= await Posts.findById(req.params.id);
    const catalldata= await Category.find({}); 
    res.status(200).render('updatepost',{
        updatepost,
        catalldata
    })
    return next();
})

exports.viewdashbord=catchasync(async (req,res,next) =>{
    res.status(200).render('dashbord');
    return next();
});

exports.userregistration=catchasync(async (req,res,next) =>{
    res.status(200).render('signupuser');
    return next();
});
exports.viewallusers=catchasync(async (req,res,next) =>{
    const delcatid= req.query.delid || '';
    const allusers=await User.find({});
    res.status(200).render('viewallusers',{
        allusers,
        delcatid
    });
    return next();
});
exports.loginme=catchasync(async (req,res,next) =>{
    res.status(200).render('login');
    return next();
});
exports.updateuserdata=catchasync(async (req,res,next) =>{
    const userinfo=await User.findById(req.params.id);
    res.status(200).render('updateuser',{
        userinfo
    });
    return next();
});


exports.viewallcomments=catchasync(async (req,res,next) =>{
    const delcommid= req.query.delid || '';
    const commentsdata= await Comments.find({});
    res.status(200).render('comments',{
        commentsdata,
        delcommid
    });
    return next();
});

