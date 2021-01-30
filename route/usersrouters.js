const express=require('express');
const authControllers=require('../controller/authcontrolles');
const adminusercontrolles=require('../controller/adminusercontrolles');

const router=express.Router();

router.route('/logout').get(authControllers.protect,authControllers.logout);
router.route('/updateuser/:id').patch(authControllers.protect,authControllers.uploadpostthumnail,authControllers.postthumnailimage,adminusercontrolles.adminuserupdate);
router.route('/delete/:id').delete(authControllers.protect,authControllers.restrictTo('Admin'),adminusercontrolles.userdelete);

router.route('/signup').post(authControllers.uploadpostthumnail,authControllers.postthumnailimage,authControllers.signup);
router.route('/login').post(authControllers.login);
router.post('/forgotPassword', authControllers.forgotPassword)
router.patch('/resetPassword/:password', authControllers.resetPassword)

module.exports=router;