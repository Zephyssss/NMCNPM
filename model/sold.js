const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const soldchema = new mongoose.Schema({
    masp: String,
    tensp: String,
    soluong: Number,
    gianhap: Number,
    giaxuat: Number,
    thue: Number,
    khuyenmai: Number,
    ngayban: String,
    hinhanh: String,
    thuonghieu: String
    },
    
    {
        collection: 'sold'
    });

const sold = db.useDb("SE").model("sold", soldchema);

module.exports = sold;