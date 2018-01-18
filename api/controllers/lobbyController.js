var { Lobby } = require('../models/lobby')
var { Message } = require('../models/message')
var { validateAll } = require('indicative')
var output = require('../../lib/output')
var moment = require('moment')

module.exports = {
  collection(req, res, next) {
    let lobby = new Lobby
    lobby.all()
      .then(data => { res.json(output.success(data, 'Success', 200)) })
      .catch(error => { next(error) })
  },

  store(req, res, next) {
    let input = req.body
    let rules = { name: 'required' }
    validateAll(input, rules)
      .then(() => {
        let lobby = new Lobby
        input.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        input.users = '0'
        lobby.create(input)
          .then(data => { res.json(output.success(null, 'Lobby created successfully', 200)) })
          .catch(error => { next(error) })
      })
      .catch(error => { next({ httpCode: 422, message: 'Input validation error', body: error }) })
  },

  join(req, res, next) {
    let lobby = new Lobby
    lobby.join(req.params.id)
      .then(data => { res.json(output.success(null, `Joined lobby ${req.params.id} successfully`, 200)) })
      .catch(error => { next(error) })
  },

  exit(req, res, next) {
    let lobby = new Lobby
    lobby.exit(req.params.id)
      .then(data => { res.json(output.success(null, `Exit lobby ${req.params.id} successfully`, 200)) })
      .catch(error => { next(error) })
  },

  delete(req, res, next) {
    let lobby = new Lobby
    lobby.delete(req.params.id)
      .then(data => { res.json(output.success(null, 'Lobby deleted successful', 200)) })
      .catch(error => { next(error) })
  },

  messages(req, res, next) {
    let message = new Message
    message.lobbyMessages(req.params.id)
      .then(data => { res.json(output.success(data, 'Success', 200)) })
      .catch(error => { next(error) })
  },

  storeMessage(req, res, next) {
    let input = req.body
    let rules = {
      name: 'required',
      type: 'required',
      message: 'required'
    }
    validateAll(input, rules)
      .then(() => {
        let message = new Message
        input.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        input.lobby_id = req.params.id
        message.create(input)
          .then(data => { res.json(output.success(null, 'Message sent successfully', 200)) })
          .catch(error => { next(error) })
      })
      .catch(error => { next({ httpCode: 422, message: 'Input validation error', body: error }) })
  },
}
