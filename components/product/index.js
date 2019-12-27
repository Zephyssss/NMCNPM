var express = require('express');
var router = express.Router();
const productController = require('./productController');

router.get('/product', productController.Product);

router.get('/editproduct',productController.Editproduct);

router.post('/editproduct',productController.EditproductData)

router.get('/createproduct',productController.Createproduct);

router.post('/createproduct',productController.CreateproductData);

router.post('/product',productController.DeleteproductData);
module.exports = router;