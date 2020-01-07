var express = require('express');
var router = express.Router();
const user = require('../model/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop shoe',layout:false});
});
module.exports = router;
