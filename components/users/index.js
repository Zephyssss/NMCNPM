var express = require('express');
var router = express.Router();

const userController = require('./usersController');

router.get('/login', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('login', { title: 'Login', errors ,layout:false});
});

router.get('/changepw', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('changepw', { title: 'Change Password', errors});
});
router.post('/changepw', userController.Changepw);

router.post('/login', userController.loginUser);

router.get('/register', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('register', { title: 'Register', errors });
});

router.post('/register', userController.createUser);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/edituser',function(req, res, next) {
    res.render('editinfor', { title: 'Edit user'});
  });

router.post('/edituser',userController.editUser)
module.exports = router;