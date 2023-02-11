const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { findOne } = require('./models/user')
const User = require('./models/user')

function initializePassport(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({email})
    // console.log(user.password)
  
    if (user == undefined) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }
 
  
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async(id, done) => {
   try {
    const user = await User.findById(id);
    done(null , user)
   } catch (error) {

   }
  })
}

module.exports = initializePassport