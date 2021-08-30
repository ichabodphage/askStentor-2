var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainPageRouter = require('./routes/mainPage');

var appTwo = express();

// view engine setup
appTwo.set('views', path.join(__dirname, 'views'));
appTwo.set('view engine', 'jade');



appTwo.use(compression());
appTwo.use(logger('dev'));
appTwo.use(express.json());
appTwo.use(express.urlencoded({ extended: false }));
appTwo.use(cookieParser());

appTwo.get('/stylesheets/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/stylesheets/" + "style.css");
});
appTwo.get('/stylesheets/slim.css', function(req, res) {
  res.sendFile(__dirname + "/public/stylesheets/" + "style.css");
});
appTwo.get('/images/askStentorLogo.svg', function(req, res) {
  res.sendFile(__dirname + "/public/images/" + "askStentorLogo.svg");
});
appTwo.use('/', indexRouter);
appTwo.use('/users', usersRouter);
appTwo.use('/ask', mainPageRouter);
// catch 404 and forward to error handler
appTwo.use(function(req, res, next) {
  next(createError(404));
});

// error handler
appTwo.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = appTwo