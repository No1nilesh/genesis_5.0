const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    }
})








module.exports = mongoose.model("User", UserSchema);