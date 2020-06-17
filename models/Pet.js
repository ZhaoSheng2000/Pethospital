const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');
const Schema = mongoose.Schema;
//实例化数据模版
const PetSchema = new Schema({
    id:{
        type:String,
        default: uuidv1
    },
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