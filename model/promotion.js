const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const productschema = new mongoose.Schema({
   magiamgia:String,
   giam: Number,
   isActive: Boolean
    },
    {
        collection: 'promotion'
    });


const product = db.useDb("SE").model("promotion", productschema);



module.exports = product;