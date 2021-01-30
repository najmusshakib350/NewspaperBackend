const senderrdev=(err,req,res) =>{
    res.status(err.statuscode).json({
       status:err.status,
       message:err.message,
       err
    });
    // res.status(err.statuscode).render('error',{
    //     message:err.message
    //  });
}
const senderrprod=(err,req,res) =>{
    if(err.isoperational){
    //    res.status(err.statuscode).json({
    //        status:err.status,
    //        message:err.message
    //    });
    res.status(err.statuscode).render('error',{
        message:err.message
     });
    }else{
    //    res.status(500).json({
    //        status:'error',
    //        message:'something went error !'
    //    });
       res.status(err.statuscode).render('error',{
        message:err.message
       });
    }
}

module.exports=(err,req,res,next) =>{
    err.statuscode=err.statuscode || 500;
    err.status=err.status || 'error';
   if(process.env.NODE_ENV==='development'){
       senderrdev(err,req,res);
   }
   else if(process.env.NODE_ENV==='production'){
       senderrprod(err,req,res);
   }
   return next();
}