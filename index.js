const express = require('express')
const app = express()
require("dotenv").config()
const connectToMongo = require('./db');
const path = require('path')
const pug = require('pug');
var cors = require('cors')
const passport = require('passport');
const bodyParser = require('body-parser');
const initializePassport = require('./passport-config');
const users = require('./models/user');
const flash = require('express-flash');
const session = require('express-session')
connectToMongo();
const port = process.env.PORT
app.use(express.static('public'));
app.use(cors())
app.use(express.json());

 initializePassport(
    passport,
    email =>  users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
    secret: "secret",
    resave : false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send(('./frontend/index.html'));
  // res.sendFile(path.join(__dirname+'/views/frontend/index.html'));
})
 

app.use("/api/register", require("./routes/register"))
app.use("/api/admin", require("./routes/admin"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})