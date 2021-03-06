var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

mongoose.connect(process.env.URI, {useNewUrlParser: true});

const indexRouter = require('./routes/index');
const userRouter = require('./components/users');
const productRouter= require('./components/product');
const soldRouter = require('./components/sold');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
  if(req.user)
  {
    res.locals.isLoggedIn=true;
    res.locals.user=req.user
    if(req.user._id=="5df26d5d81f0fd1b9ced09c1")
      {
        res.locals.isAdmin=true;
      }
      else{
        res.locals.isAdmin=false;
      }
  }
  else{
    res.locals.isLoggedIn=false;
  }

  
  next();
})

// Connect flash
app.use(flash());

app.use('/', indexRouter);
app.use('/',userRouter);
app.use('/',productRouter);
app.use('/',soldRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
