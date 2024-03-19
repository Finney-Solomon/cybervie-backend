const mongoose = require('mongoose'); 

let userLeadsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
         unique:true,
    },
    mobile:{
        type:String,
        required:true,
        // unique:true,
    },
    message:{
        type:String,
    },
    date:{
        type:Date,
        default: Date.now() 
    },
    callUser:{
        type:Boolean,
        default:false
    },
    studentStatus:{
        type:String,
        default: "Interested" 
    }

});

module.exports = mongoose.model('users_leads', userLeadsSchema);