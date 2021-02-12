const express= require('express');
const categorycontrolles =require('./../controller/commentcontrolles');
const authControllers=require('../controller/authcontrolles');

const router=express.Router();


// router.route('/add').post(categorycontrolles.postcomments);
router.route('/addusercomments').post(categorycontrolles.postusercomments);
// router.route('/viewallcomments').get(categorycontrolles.getallcomments);
router.route('/viewuserallcomments').get(categorycontrolles.showallcomments);
router.route('/delete/:id').delete(authControllers.protect,authControllers.restrictTo('Admin'),categorycontrolles.commentdelete);


//frontend part
// router.route('/showallcomments').get(categorycontrolles.showallcomments)
module.exports=router;