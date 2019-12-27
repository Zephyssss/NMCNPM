const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const productschema = new mongoose.Schema({
    masp: String,
    tensp: String,
    hinhanh: String,
    thuonghieu: String,
    soluong: Number,
    gianhap: Number,
    giaxuat: Number,
    thue: Number
    },
    {
        collection: 'product'
    });

const product = db.useDb("SE").model("product", productschema);

module.exports = product;