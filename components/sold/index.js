var express = require('express');
var router = express.Router();
const productController = require('./soldController');

router.get('/checkout', productController.thanhtoan);
router.get('/doanhthu', productController.doanhthu);


module.exports = router;