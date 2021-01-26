const express= require('express');
const postcontrolles =require('./../controller/postcontrolles');
const authControllers=require('../controller/authcontrolles');
const router=express.Router();

router.route('/delete/:id').delete(authControllers.protect,authControllers.restrictTo('Admin'),postcontrolles.postdelete);
router.route('/add').post(authControllers.uploadpostthumnail,authControllers.postthumnailimage,postcontrolles.postadd);
router.route('/update/:id').patch(authControllers.protect,authControllers.uploadpostthumnail,authControllers.postthumnailimage,postcontrolles.postupdate);

module.exports=router;