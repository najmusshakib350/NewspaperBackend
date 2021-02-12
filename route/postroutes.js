const express= require('express');
const postcontrolles =require('./../controller/postcontrolles');
const authControllers=require('../controller/authcontrolles');
const router=express.Router();

router.route('/delete/:id').delete(authControllers.protect,authControllers.restrictTo('Admin'),postcontrolles.postdelete);
router.route('/add').post(authControllers.protect,postcontrolles.uploadpostthumnail,postcontrolles.postthumnailimage,postcontrolles.postadd);
router.route('/update/:id').patch(authControllers.protect,postcontrolles.uploadpostthumnail,postcontrolles.postthumnailimage,postcontrolles.postupdate);

//fronted part 
router.route('/showallpost').get(postcontrolles.showallpost);
router.route('/showspecificcatpost/:id').get(postcontrolles.showscpost);
router.route('/showonecatpost/:id').get(postcontrolles.showsonepost);
router.route('/catonefindoutname/:id').get(postcontrolles.categoryfindonenamecontrolles);

module.exports=router;