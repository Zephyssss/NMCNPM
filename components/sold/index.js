var express = require('express');
var router = express.Router();
const productController = require('./soldController');

router.get('/checkout', productController.thanhtoan);


module.exports = router;