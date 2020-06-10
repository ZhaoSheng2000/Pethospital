const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const UserlogSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    loginLog:{
        type:Array,
        required:true
    }
});

module.exports = Userlog = mongoose.model("userlogs",UserlogSchema);