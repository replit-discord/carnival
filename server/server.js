import dd from 'debug';
import http from 'http';

import app from './app';

const debug = dd('carnival:server');

// store port in express
let port = process.env.PORT || '4000';
app.set('port', port);

// create http server
let server = http.createServer(app);

// listen to provided port, on all provided interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// event listener for http 'error' event
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

// event listener for 'listening' event
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
