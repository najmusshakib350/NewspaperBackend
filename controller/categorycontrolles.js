const Category =require('./../model/category');
const catchasync=require('./../utils/catchasync');

exports.categoryaddcontrolles=catchasync(async (req,res,next) =>{
    req.body.parentid='';
    let catobj='';
    if(req.body.parentstatus==="primary category"){
        req.body.parentid=0;
    }
    else{
        catobj=await Category.find({catname:req.body.parentstatus});
        req.body.parentid=catobj[0]._id;
    }
    const catdata=await Category.create(req.body);
    res.status(201).json({
        status:"success",
        catdata
    });
    return next();
})

exports.categoryfindallcontrolles=catchasync(async (req,res,next) =>{
    const catdata= await Category.find({});
    res.status(200).json({
        status:"success",
        catlength: catdata.length,
        catdata
    });
    return next();
})

exports.categoryfindonecontrolles =catchasync(async (req,res,next) =>{
    const catdata=await Category.findById(req.params.id);
    res.status(200).json({
        status:"success",
        catdata
    });
    return next();
})

exports.categoryupdatecontrolles=catchasync(async (req,res,next) =>{
    const catchildupd=await Category.find({parentid:req.params.id});

    catchildupd.forEach(async el =>{
        el.parentstatus=req.body.catname;
        const catchildconupdate=await Category.findByIdAndUpdate(el._id, el,{
            new:true,
            runValidators:true
        });
    });

   // console.log(catchildupd);
    req.body.catdat=new Date();
    const catdata = await Category.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        status:"success",
        catdata
    });
    return next();
})

exports.categorydeletecontrolles =catchasync(async (req,res,next) =>{
    const catchilddel=await Category.find({parentid:req.params.id});

    catchilddel.forEach(async el =>{
        const catchildcondelete=await Category.findByIdAndDelete(el._id);
    });
    const catdata = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success",
        catdata
    });
    return next();
})