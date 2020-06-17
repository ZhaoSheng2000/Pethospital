const mongoose = require('mongoose');
const Schema = mongoose.Schema;
function localDate(v) {
    const d = new Date(v || Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
}

//实例化数据模版
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    date:{
        type:Date,
        default: Date.now
    },
    userlog:{
        type:Array
    }
});

module.exports = User = mongoose.model("users",UserSchema);