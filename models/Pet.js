const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const PetSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:Number
    },
    type:String,
    birth:Date,
    visitRecords:Array,
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = PerOwner = mongoose.model("pets",PetSchema);