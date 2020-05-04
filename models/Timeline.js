const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const TimelineSchema = new Schema({
    userId: String,
    createTime: Number,
    timeline: [{
        title: String,
        label: String,
        fromDate: String,
        toDate: String,
    }]
});

module.exports = Timeline = mongoose.model('timeline',TimelineSchema)