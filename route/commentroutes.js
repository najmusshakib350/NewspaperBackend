const express= require('express');
const categorycontrolles =require('./../controller/commentcontrolles');
const authControllers=require('../controller/authcontrolles');

const router=express.Router();


router.route('/add').post(categorycontrolles.postcomments);
router.route('/viewallcomments').get(categorycontrolles.getallcomments);
router.route('/delete/:id').delete(authControllers.restrictTo('Admin'),categorycontrolles.commentdelete);
module.exports=router;