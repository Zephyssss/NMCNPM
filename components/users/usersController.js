const UserService = require('./usersService');
const passport = require('passport');
require('../../passport')(passport);

module.exports.loginUser = async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/',
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
    }catch(e){
        next(e);
    }
    
};
