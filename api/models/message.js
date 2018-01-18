var { Model } = require('../../lib/model')
var db = require('../../lib/database')

class Message extends Model {
  constructor() {
    let table = 'messages'

    let fillable = [
      'name',
      'type',
      'message',
      'lobby_id',
      'created_at'
    ]

    super(table, fillable)
  }

  lobbyMessages(id) {
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM ${this.table} where lobby_id = ${id}`)
        .then((data) => { resolve(data) })
        .catch((error) => { reject(error) })
    })
  }
}

module.exports = {
  Message: Message
}
