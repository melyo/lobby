var lobbyController = require('./controllers/lobbyController')

module.exports = (app) => {

  // prefix
  var prefix = '/api/v1'

  // events
  app.get(prefix+'/lobbies', lobbyController.collection)
  app.post(prefix+'/lobbies', lobbyController.store)
  app.patch(prefix+'/lobbies/:id/join', lobbyController.join)
  app.patch(prefix+'/lobbies/:id/exit', lobbyController.exit)
  app.delete(prefix+'/lobbies/:id', lobbyController.delete)
  app.get(prefix+'/lobbies/:id/messages', lobbyController.messages)
  app.post(prefix+'/lobbies/:id/messages', lobbyController.storeMessage)

}
