const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const PetWithOwnerSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    petid:{
        type:Array,
        required:true
    }
});

module.exports = PetWithOwner = mongoose.model("petwithowners",PetWithOwnerSchema);