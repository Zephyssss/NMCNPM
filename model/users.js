const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const useraccoutschema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    phone:  String,
    gender: Boolean,
    birth: String,
    worktime: Number, //đơn vị là phút
    salary: Number //đơn vị Ngàn đồng/giờ
    },
    {
        collection: 'user'
    });

const user = db.useDb("SE").model("user", useraccoutschema);

module.exports = user;