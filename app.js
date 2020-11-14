const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const passport = require('passport');
const session  = require('express-session');
const connectDB = require('./config/db')

const app = express();
const PORT = 3000;

//passport config
require('./config/passport')(passport);

//load dotenv config.
dotenv.config();    
connectDB();
//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main' , 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

//Express sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/',require('./routes/index'));

app.listen(PORT , console.log('LIstening at port 3000'));