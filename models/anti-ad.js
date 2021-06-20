const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    Guild: String, 
    Action: String,
})

module.exports = mongoose.model('Anti-Ad', Schema)