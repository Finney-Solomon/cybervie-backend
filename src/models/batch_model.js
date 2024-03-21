const mongoose = require('mongoose'); 

let batchModelSchema = new mongoose.Schema({
    batchName: {
        type: String,
        required: true,
        index: true
    },
    batchCode: {
        type: String,
        unique: true
    },
    batchStartDate: {
        type:Date,
        default: Date.now() 
    },
    batchEndDate: {
        type:Date,
        default: Date.now() 
    },
    batchStatus: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('batch', batchModelSchema)
