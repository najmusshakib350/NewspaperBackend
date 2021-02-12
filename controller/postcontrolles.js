const multer=require('multer');
const sharp=require('sharp');
const AppError=require('./../utils/apperror');
const catchasync=require('./../utils/catchasync');
const Posts=require('./../model/posts');
const Category =require('./../model/category');
const factory=require('./factorycontrolles');



exports.postadd= factory.addOne(Posts, Category);
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
        status:"succes",
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
exports.postdelete= factory.deleteOne(Posts, "");

exports.showallpost=catchasync(async (req,res,next) => {
    const postall= await Posts.find({}).sort( { post_date: -1 } );
    res.status(200).json({
        status:"succes",
        postall
    });
    return next();
});

exports.showscpost=catchasync(async (req,res,next) => {
    const onepost= await Posts.find({category_id:req.params.id});
    res.status(200).json({
        status:"succes",
        onepost
    });
    return next();
});
exports.showsonepost=catchasync(async (req,res,next) => {
    const onepost= await Posts.findById(req.params.id);
    res.status(200).json({
        status:"succes",
        onepost
    });
    return next();
});

exports.categoryfindonenamecontrolles =catchasync(async (req,res,next) =>{
    const catdata=await Posts.find({category_name:req.params.id});
    res.status(200).json({
        status:"succes",
        catdatalength:catdata.length,
        catdata
    });
    return next();
})



