
var app = require('../app');
var appTwo = require('../appTwo')
var debug = require('debug')('website:server');
var http = require('http');
var https = require('https');
var fs = require('fs')
/* 

    uncomment the commented code to use HTTPS. just make sure you have an SSL key and cert


var key = fs.readFileSync(__dirname + '/askstentor.txt');
var cert = fs.readFileSync(__dirname + '/askstentor.crt');

var options = {
  key: key,
  cert: cert
};
*/


var port = normalizePort(process.env.PORT || '80');
// var portTwo = normalizePort(process.env.PORT || '443');
app.set('port', port);
// appTwo.set('port', portTwo);

var server = http.createServer(app);
// var serverTwo = https.createServer(options,appTwo);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
serverTwo.listen(portTwo);
serverTwo.on('error', onError);
serverTwo.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
