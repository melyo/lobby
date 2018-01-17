var bodyParser = require('body-parser')
var morgan = require('morgan')

module.exports = (app) => {

  app.use(bodyParser.json())

  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
  })

  app.use(morgan('dev'))

}
