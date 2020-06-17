const mongoose = require('mongoose');
const Schema = mongoose.Schema;
function localDate(v) {
    const d = new Date(v || Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
}
//实例化数据模版
const AdminSchema = new Schema({
    name:String,
    username:String,
    password:String,
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Admin = mongoose.model("admins",AdminSchema);