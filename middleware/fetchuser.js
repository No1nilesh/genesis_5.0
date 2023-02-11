
const { json } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET  ="Nilesh@goodboy";

const fetchuser =  (req, res , next)=>{



const token = req.header('auth-token');

if(!token){
  return  res.status(401).json({error : "Access Denied"});
}
try {
const data =  jwt.verify(token, JWT_SECRET );

req.user = data;

next();
        
} catch (error) {
        res.status(500).send(error.message)
        console.error(error)
}
}

module.exports = fetchuser;