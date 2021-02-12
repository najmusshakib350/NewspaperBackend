const express= require('express');
const categorycontrolles =require('./../controller/categorycontrolles');
const authControllers=require('../controller/authcontrolles');
const router=express.Router();

router.route('/add').post(categorycontrolles.categoryaddcontrolles);
router.route('/allcatfindout').get(categorycontrolles.categoryfindallcontrolles);
router.route('/catonefindout/:id').get(categorycontrolles.categoryfindonecontrolles);

router.route('/update/:id').patch(authControllers.protect,categorycontrolles.categoryupdatecontrolles);
router.route('/delete/:id').delete(authControllers.protect,authControllers.restrictTo('Admin'),categorycontrolles.categorydeletecontrolles);

//frontend part
router.route('/showallcategory').get(categorycontrolles.categoryfindallcontrolles);
router.route('/findoutcatname/:id').get(categorycontrolles.findoutcatname);
module.exports=router;