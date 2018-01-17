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
app.listen(port, () => { console.log(`Up and running on port ${port}`) })
