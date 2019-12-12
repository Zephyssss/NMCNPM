const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const useraccoutschema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
    },
    {
        collection: 'user'
    });

const user = db.useDb("SE").model("user", useraccoutschema);

module.exports = user;