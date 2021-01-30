const express=require('express');
const viewcontrolles= require('./../controller/viewcontrolles');
const authControllers=require('../controller/authcontrolles');
const router=express.Router();


router.route('/').get(authControllers.protect,viewcontrolles.viewdashbord);
router.route('/newsbd/').get(viewcontrolles.loginme);
router.route('/newsbd/userregistration').get(viewcontrolles.userregistration);
router.route('/forgotpassword').get(viewcontrolles.forgotpassword);
router.route('/resetPassword/:password').get(viewcontrolles.resetpassword);


router.route('/viewcategory').get(authControllers.protect,viewcontrolles.viewcategory);
router.route('/viewallpost').get(authControllers.protect,viewcontrolles.viewallpost);
router.route('/addpost').get(authControllers.protect,viewcontrolles.addpost);
router.route('/updatepost/:id').get(authControllers.protect,authControllers.restrictTo('Admin'),viewcontrolles.updatepost);
router.route('/updatecategory/:id').get(authControllers.protect,authControllers.restrictTo('Admin'),viewcontrolles.updatecategory);
router.route('/viewallusers').get(authControllers.protect,viewcontrolles.viewallusers);
router.route('/updateuserdata/:id').get(authControllers.protect,authControllers.restrictTo('Admin'),viewcontrolles.updateuserdata);
router.route('/allcomments').get(authControllers.protect,viewcontrolles.viewallcomments);



module.exports=router;