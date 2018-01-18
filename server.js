// load configurations from .env
var dotenv = require('dotenv')
dotenv.load()

// connect to database
var db = require('./lib/database')
db.connect()
  .then((data) => { console.log('Database connected', data) })
  .catch((error) => { console.log('Database error', error) })

// init express server
var express = require('express')
var app = express()

// express middlewares
var middlewares = require("./lib/middlewares")
middlewares(app)

// express api routes
var routes = require("./api/routes")
routes(app)

// express api exceptions handler
var exceptions = require("./lib/exceptions")
exceptions(app)

// express serve vue build
var history = require('connect-history-api-fallback')
var serveStatic = require('serve-static')
app.use(history())
app.use(serveStatic(__dirname + "/dist"))

// get our server running
var port = process.env.APP_PORT || 3000
var server = app.listen(port, () => { console.log(`Up and running on port ${port}`) })

// Socket setup & pass server
var socket = require('socket.io');
var io = socket(server);
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

  socket.on('joinLobby', function(lobby){
    socket.join(lobby.name)
    io.sockets.emit('lobbyChannel', 'refresh')
  });

  socket.on('exitLobby', function(lobby){
    socket.leave(lobby.name)
    io.sockets.emit('lobbyChannel', 'refresh')
  });

  socket.on('refreshLobby', function(){
    io.sockets.emit('lobbyChannel', 'refresh')
  });

  socket.on('messageLobby', function(lobby){
    io.sockets.in(lobby.name).emit('messageChannel', lobby)
  });

  socket.on('disconnect', function(){
    console.log('disconnected', socket.id);
  });

});
