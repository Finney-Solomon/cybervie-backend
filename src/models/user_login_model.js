const mongoose = require('mongoose'); 

let userLoginSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        required: true,
        default: "user"
    },
    googleToken: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type:String,

    }
});

module.exports = mongoose.model('users_logins', userLoginSchema);
