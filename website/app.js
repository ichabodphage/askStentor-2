var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session')
var fs = require('fs')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({ secret: 'tdzuPjzW7fV5RwXnkMGuMXUUjsWqFK',
resave: false,
saveUninitialized: true,
cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//read the public file and create routes for static files
fs.readdirSync(__dirname +"/public").forEach(directory => {

  fs.readdirSync(__dirname +"/public/" +directory).forEach(file => {
    console.log(directory+"/"+file +" has been added to the HTTP server")
    
    app.get("/"+directory+"/"+file, function(req, res) {
      res.sendFile(__dirname + "/public/" + directory+"/"+file);

    });

  });

});


//read the routes file and add the routes into the application
fs.readdirSync(__dirname +"/routes").forEach(file => {
  var route = require('./routes/'+file)
  app.use(route.path, route.router);
});

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

module.exports = app