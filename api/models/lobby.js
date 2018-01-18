var { Model } = require('../../lib/model')
var db = require('../../lib/database')

class Lobby extends Model {
  constructor() {
    let table = 'lobbies'

    let fillable = [
      'name',
      'users',
      'created_at'
    ]

    super(table, fillable)
  }

  join(id) {
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE ${this.table} SET users = users + 1 WHERE id = ${id}`)
        .then((data) => { resolve(data) })
        .catch((error) => { reject(error) })
    })
  }

  exit(id) {
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE ${this.table} SET users = users - 1 WHERE id = ${id}`)
        .then((data) => { resolve(data) })
        .catch((error) => { reject(error) })
    })
  }
}

module.exports = {
  Lobby: Lobby
}
