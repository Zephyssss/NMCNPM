var express = require('express');
var router = express.Router();
const productController = require('./productController');

router.get('/product', productController.Product);

router.get('/editproduct',productController.Editproduct);

router.post('/editproduct',productController.EditproductData)

router.get('/createproduct',productController.Createproduct);

router.post('/createproduct',productController.CreateproductData);

router.post('/product',productController.DeleteproductData);

router.get('/addthanhtoan', productController.addBill);

router.post('/thanhtoan', productController.makhuyenmai);

router.get('/thanhtoan', productController.checkout);

router.post('/timkiem', productController.search);

router.get('/xoabill', productController.removeBill);

router.get('/tang', productController.tangSoluong);

router.get('/giam', productController.giamSoluong);

router.get('/xoa1', productController.xoa1Bill);




module.exports = router;