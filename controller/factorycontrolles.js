const AppError=require('./../utils/apperror');
const catchasync=require('./../utils/catchasync');

//delete function
exports.deleteOne= (Model1, Model2) => catchasync(async (req,res,next) =>{
   if(Model2!=""){
        const deletec=await Model2.find({userid: req.params.id});
        deletec.forEach(async el => {
            await Model2.findByIdAndDelete(el._id);
        }); 
   }
   await Model1.findByIdAndDelete(req.params.id);   
    res.status(200).json({
        status:"succes"
    })
    return next();
});


exports.addOne=(Model1,Model2) =>catchasync(async (req,res,next) =>{
    if(Model2!=""){
        const objarr=await Model2.find({catname:req.body.category_name});
        req.body.category_id=objarr[0]._id;
        req.body.thumbnail='';
        if(req.file){
            req.body.thumbnail=req.file.filename;
        }
        req.body.author_id=req.user._id;
    }

    const data=await Model1.create(req.body);
    res.status(201).json({
        status:"succes",
        data
    });
    return next();
});