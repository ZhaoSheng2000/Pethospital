const mongoose = require('mongoose');
const Schema = mongoose.Schema;
function localDate(v) {
    const d = new Date(v || Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
}
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
    petid:Array,
    date:{
        type:Date,
        default: localDate
    }
});

module.exports = PerOwner = mongoose.model("petowners",PetOwnerSchema);