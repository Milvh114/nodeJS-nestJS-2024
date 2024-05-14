// import mongoose from 'mongoose';
const mongoose = require("mongoose")

const msgSchema = new mongoose.Schema({
    content:{
        type: String,
        require: [true, "pls enter content"]
    },
    room:{
        type: String,
        require: true
        // lowercase: true,
    }
    // createdAt: {
    //     type: Date,
    //     default: () => Date.now(),
    //     immutable: true,
    // },
    // updatedAt: Date,
}, {
    versionKey: false, // Tắt việc sử dụng phiên bản
    timestamps: true
})

const Msg = mongoose.model('messages', msgSchema)
module.exports = Msg;