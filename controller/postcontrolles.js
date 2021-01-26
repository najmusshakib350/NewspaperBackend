const multer=require('multer');
const sharp=require('sharp');
const AppError=require('./../utils/apperror');
const catchasync=require('./../utils/catchasync');
const Posts=require('./../model/posts');
const Category =require('./../model/category');

exports.postadd=catchasync(async (req,res,next) =>{
    const objarr=await Category.find({catname:req.body.category_name});
    req.body.category_id=objarr[0]._id;
    req.body.thumbnail='';
    if(req.file){
        req.body.thumbnail=req.file.filename;
    }
    const data= await Posts.create(req.body);
    res.status(201).json({
        status:"post success",
        data
    })
    return next();
});

exports.postupdate=catchasync(async (req,res,next) =>{
    const objarr=await Category.find({catname:req.body.category_name});
    req.body.category_id=objarr[0]._id;
    if(req.file){
        req.body.thumbnail=req.file.filename;
    }
    const data= await Posts.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    res.status(200).json({
        status:"update success",
        data
    })
    return next();
});

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

exports.uploadpostthumnail=upload.single('thumbnail');

exports.postthumnailimage=catchasync(async (req,res,next) =>{
    if(!req.file) return next();

    req.file.filename=`${Math.random()}.jpeg`;

    await sharp(req.file.buffer)
    .resize(800,600)
    .toFormat('jpeg')
    .jpeg({ quality: 90})
    .toFile(`public/image/postthumnail/${req.file.filename}`)
    return next();
});

exports.postdelete=catchasync(async (req,res,next) =>{
    const deletepost=await Posts.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"delete success"
    })
    return next();
});