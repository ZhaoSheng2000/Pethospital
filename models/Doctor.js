const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const DoctorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    label:{
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Doctor = mongoose.model("doctors",DoctorSchema);