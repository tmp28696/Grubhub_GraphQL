//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema/schema');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
module.exports = app;
const fs = require('fs');
var signupcontroller=require('./controllers/signupcontroller');
var logincontroller=require('./controllers/logincontroller');
var updatecontroller=require('./controllers/updatecontroller');
var homecontroller=require('./controllers/homecontroller');
var itemcontroller=require('./controllers/itemcontroller');
var menucontroller=require('./controllers/menucontroller');
var profilecontroller=require('./controllers/profilecontroller');
var passportauth = passport.authenticate('jwt', { session: false })
app.use(passport.initialize());
require('./config/passport')(passport);

//use express session to maintain session data
app.use(session({
    secret              : 'grubhub',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.post('/signup',signupcontroller.signup);
app.post('/login',logincontroller.login);
app.post('/updatename', updatecontroller.updatename);
app.post('/updateemail', updatecontroller.updateemail);
app.post('/updatephone', updatecontroller.updatephone);
app.post('/updateresname', updatecontroller.updateresname);
app.post('/orders', homecontroller.orders);
app.post('/cancelorder', homecontroller.cancelorder);
app.post('/updatefoodstatus', homecontroller.updatefoodstatus);
app.post('/additem', itemcontroller.additem);
app.post('/updateitemname', itemcontroller.updateitemname);
app.post('/updateitemdesc', itemcontroller.updateitemdesc);
app.post('/updatemenusection', itemcontroller.updatemenusection);
app.post('/updateitemprice', itemcontroller.updateitemprice);
app.post('/deleteitem', itemcontroller.deleteitem);
app.post('/deletesection', itemcontroller.deletesection);
app.post('/menu', menucontroller.menu);
app.post('/profile', profilecontroller.profile);
//app.get('/completedorders',homecontroller.completedorders);


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");