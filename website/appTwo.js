var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var session = require('express-session');
var fs = require('fs')
var appTwo = express();

// view engine setup
appTwo.set('views', path.join(__dirname, 'views'));
appTwo.set('view engine', 'jade');


appTwo.use(session({ secret: 'tdzuPjzW7fV5RwXnkMGuMXUUjsWqFK',
resave: false,
saveUninitialized: true,
cookie: { secure: true, maxAge: 1000 * 60 * 60 * 2  }
}));

appTwo.use(compression());
appTwo.use(logger('dev'));
appTwo.use(express.json());
appTwo.use(express.urlencoded({ extended: false }));
appTwo.use(cookieParser());


//read the public file and create routes for static files
fs.readdirSync(__dirname +"/public").forEach(directory => {

  fs.readdirSync(__dirname +"/public/" +directory).forEach(file => {
    console.log(directory+"/"+file +" has been added to the HTTPS server")
    
    appTwo.get("/"+directory+"/"+file, function(req, res) {
      res.sendFile(__dirname + "/public/" + directory+"/"+file);

    });

  });

});

//read the routes file and add the routes into the application
fs.readdirSync(__dirname +"/routes").forEach(file => {
  var route = require('./routes/'+file)
  appTwo.use(route.path, route.router);
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