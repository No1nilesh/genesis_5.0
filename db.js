const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
require('dotenv').config();
const URI = process.env.URI

const connectToMongo=()=>{
    mongoose.connect(URI, 
      { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
         console.log(`Connected to MongoDb Atlas`);
      }).catch((err)=> console.log(err));


}

module.exports = connectToMongo;  