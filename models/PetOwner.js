const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const PetOwnerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:Number
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = PerOwner = mongoose.model("petowners",PetOwnerSchema);