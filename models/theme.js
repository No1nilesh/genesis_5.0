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
    },
    group_dance :{
        type: [String], 
        default : "Not selected"
    },
    fashion_show :{
        type: [String], 
        default : "Not selected"
    },
    mr_ms :{
        type: [String], 
        default : "Not selected"
    },
    tug_of_war :{
        type: [String], 
        default : "Not selected"
    },
    surprice_event :{
        type: String, 
        default : "Not selected"
    },
    war_of_word :{
        type: String, 
        default : "Not selected"
    },
    third_degree :{
        type: String, 
        default : "Not selected"
    },
    meme_making :{
        type: String, 
        default : "Not selected"
    },
    code_hunt :{
        type: [String], 
        default : "Not selected"
    },
    blind_coding :{
        type: [String], 
        default : "Not selected"
    },
    photography :{
        type: String, 
        default : "Not selected"
    },  
    cinematic_creation :{
        type: [String], 
        default : "Not selected"
    },
    cs_go :{
        type: [String], 
        default : "Not selected"
    },
    nfs :{
        type: String, 
        default : "Not selected"
    },
    fifa :{
        type: String, 
        default : "Not selected"
    }
  
})


module.exports = mongoose.model("theme", ThemeSchema);