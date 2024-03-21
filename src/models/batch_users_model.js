const mongoose = require('mongoose'); 

let batchModelSchema = new mongoose.Schema({
  
    batchCode:{
        type:String,
        required:true,
        index:true,
    },
    leadUserId:{
        type:String,
        required:true,
         unique:true,
    },
    leadUserName:{
        type:String,
        required:true,
         unique:true,
    },
    leadUserPhoneNumber:{
        type:String,
        required:true,
         unique:true,
    },
    leadUserEmailId:{
        type:String,
        required:true,
         unique:true, 
    }, 
});

module.exports = mongoose.model('batch', batchModelSchema);