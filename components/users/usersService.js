const bcrypt = require('bcryptjs');
const UserModel = require('../../model/users');
module.exports.createUser = (res, name, username, password,phone) => {
    let errors = [];
    if (!name || !username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', { errors });
    } else {

        UserModel.findOne({ username: username }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', { errors });
            } else {
                let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                //dòng dưới để tạo tài khoản, đối số trong{} theo đúng thứ tự trong model
                const newUser = new UserModel({ name, username, password: hash });
                res.redirect('/');
                return newUser.save();
            }
        });

    }
};

module.exports.EditUserData = (res, id,name,phone, gender,birth) => {
    let errors = [];
    console.log(id)
    console.log(name)
    console.log(phone)
    console.log(gender)
    console.log(birth)
    if (!name || !phone || !gender||!birth) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (errors.length > 0) {
        res.render('editinfor', { errors });
    } else {
        var current={_id: id};
        var newvalues = { $set: {name: name, phone: phone,gender:gender,birth:birth} };
        UserModel.updateOne(current,newvalues,function(err,res){
           if(err) throw err;
        })
       res.redirect('/login');
    }
};