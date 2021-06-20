const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    Guild: String, 
    Action: String,
    Messages: Number
})

module.exports = mongoose.model('Anti-spam', Schema)