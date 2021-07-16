const mongo = require('mongoose')

const Schema = new mongo.Schema({
  Guild: String,
  Action: String,
  Words: Array,
})

module.exports = mongo.model("blacklisted-words", Schema)