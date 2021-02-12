const Category =require('./../model/category');
const Posts=require('./../model/posts');
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
        status:"succes",
        catdata
    });
    return next();
})

exports.categoryfindallcontrolles=catchasync(async (req,res,next) =>{
    const catdata= await Category.find({});
    res.status(200).json({
        status:"succes",
        catlength: catdata.length,
        catdata
    });
    return next();
})

exports.categoryfindonecontrolles =catchasync(async (req,res,next) =>{
    const catdata=await Category.findById(req.params.id);
    res.status(200).json({
        status:"succes",
        catdata
    });
    return next();
})


exports.categoryupdatecontrolles=catchasync(async (req,res,next) =>{
    const catchildupd=await Category.find({parentid:req.params.id});
    
    //child category update
    catchildupd.forEach(async el =>{
        el.parentstatus=req.body.catname;
        const catchildconupdate=await Category.findByIdAndUpdate(el._id, el,{
            new:true,
            runValidators:true
        });
    });
    //parent category update
    req.body.catdat=new Date();
    const catdata = await Category.findByIdAndUpdate(req.params.id,req.body);
    //Post Update
    const postcatnameupd=await Posts.find({category_id:req.params.id});
    postcatnameupd.forEach(async el => {
        el.category_name=req.body.catname;
        await Posts.findByIdAndUpdate(el._id, el);
    });

    res.status(200).json({
        status:"succes",
        catdata
    });
    return next();
})

exports.categorydeletecontrolles =catchasync(async (req,res,next) =>{
    const catchilddel=await Category.find({parentid:req.params.id});
    const postcatnamedel=await Posts.find({});
    //child category delete
    catchilddel.forEach(async el1 =>{
        postcatnamedel.forEach(async el2 => {
            if(el1.catname === el2.category_name){
                await Posts.findByIdAndDelete(el2._id);
            }
        });
        const catchildcondelete=await Category.findByIdAndDelete(el1._id);  
    });

    //parent category delete
    const catdata = await Category.findByIdAndDelete(req.params.id);
    //Post delete
     const postcatnamedelpar=await Posts.find({category_id:req.params.id});
    postcatnamedelpar.forEach(async el => {
        await Posts.findByIdAndDelete(el._id);
    });
    res.status(200).json({
        status:"succes",
        catdata
    });
    return next();
})

exports.findoutcatname=catchasync(async (req,res,next) => {
    req.params.id=req.params.id.charAt(0).toUpperCase()+req.params.id.slice(1);
    const onecat= await Category.find({catname:req.params.id});
    res.status(200).json({
        status:"succes",
        onecat
 
    });
    return next();
});