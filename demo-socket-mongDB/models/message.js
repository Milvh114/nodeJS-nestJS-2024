const mongoose = require("mongoose")

const msgSchema = new mongoose.Schema({
    content:{
        type: String,
        require: true
    },
    room:{
        type: String,
        require: true,
        // lowercase: true,
    }
    // createdAt: {
    //     type: Date,
    //     default: () => Date.now(),
    //     immutable: true,
    // },
    // updatedAt: Date,
}, {
    versionKey: false // Tắt việc sử dụng phiên bản
})

const Msg = mongoose.model('messages', msgSchema)
module.exports = Msg;