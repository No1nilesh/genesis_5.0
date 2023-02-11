const mongoose = require('mongoose');

const {Schema} = mongoose;

const ThemeSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    email : {
        type: String,
        required : true
    },
    college : {
        type: String,
        required : true
    },
    theme : {
        type :String,
        required : true
    }
})


module.exports = mongoose.model("theme", ThemeSchema);