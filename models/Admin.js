const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const AdminSchema = new Schema({
    name:String,
    username:String,
    password:String
});

module.exports = Admin = mongoose.model("admins",AdminSchema);