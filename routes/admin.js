const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Event = require("../models/theme");
const jwt = require('jsonwebtoken');
const { findById, find } = require('../models/user');
const { findOne } = require('../models/theme');
require("dotenv").config();
const JWT_SECRET = process.env.SECRET
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session')
const pug = require('pug');
const { body, validationResult } = require("express-validator");


// /admin/signup

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


router.post('/signup', checkAuthenticated , [
  
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ], async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash =  bcrypt.hashSync(password, 10);
        const user = await User.create({ email, password: hash });
        const data = {
            id:user.id
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        res.redirect('/login');
        // res.json({authtoken})
    } catch (error) {
        res.status(500).send(error.message);
    }
});




router.get('/login', (req, res)=>{
res.render('login')
})


router.post('/login',checknotAuthenticated, passport.authenticate('local', {
    successRedirect: '/api/admin/dashboard',
    failureRedirect: '/api/admin/login',
    failureFlash: true
  }) 

)




router.get('/dashboard', checkAuthenticated, async(req, res) => {

    try {
        
  
    const event = await Event.find({});

    res.render('dashboard', {event : event});

} catch (error) {
        res.send({error : "error"})
}
});

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/api/admin/login')
}
function checknotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return  res.redirect('/api/admin/login');
    }
    return next()
   
}

module.exports = router;



