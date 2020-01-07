const UserService = require('./usersService');
const passport = require('passport');
require('../../passport')(passport);

module.exports.loginUser = async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/thanhtoan',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    } catch (e) {
        next(e);
    }
}

module.exports.createUser = async (req, res, next) => {
    try{
        await UserService.createUser(res,req.body.name,req.body.username,req.body.password);
        //chỗ tạo tài khoản phải truyền thêm biến
        //vi dụ
        //await UserService.createUser(res,req.body.name,req.body.username,req.body.password,req.body.phone);
    }catch(e){
        next(e);
    }
    
};

module.exports.editUser = async (req, res, next) => {
    try {
        await UserService.EditUserData(res,req.body._id,req.body.hovaten,req.body.sodth,req.body.sex,req.body.ngaysinh);
    } catch (error) {
        next(error);
    }
}
