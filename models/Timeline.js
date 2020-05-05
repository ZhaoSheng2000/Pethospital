const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模版
const TimelineSchema = new Schema({
    userId: String,
    createTime: String,
    timeline: Array,
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
});

module.exports = Timeline = mongoose.model('timeline', TimelineSchema)