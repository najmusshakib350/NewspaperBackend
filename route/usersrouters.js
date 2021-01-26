const express=require('express');
const authControllers=require('../controller/authcontrolles');
const adminusercontrolles=require('../controller/adminusercontrolles');

const router=express.Router();

router.route('/delete/:id').delete(authControllers.protect,authControllers.restrictTo('Admin'),adminusercontrolles.userdelete);
router.route('/signup').post(authControllers.uploadpostthumnail,authControllers.postthumnailimage,authControllers.signup);
router.route('/updateuser/:id').patch(authControllers.protect,authControllers.uploadpostthumnail,authControllers.postthumnailimage,adminusercontrolles.adminuserupdate);
router.route('/login').post(authControllers.login);
router.route('/logout').get(authControllers.protect,authControllers.logout);
// router.route('/updatepassword').patch(authControllers.protect,authControllers.updatePassword);
// router.post('/forgotPassword', authControllers.forgotPassword)
// router.patch('/resetPassword/:password', authControllers.resetPassword)

module.exports=router;