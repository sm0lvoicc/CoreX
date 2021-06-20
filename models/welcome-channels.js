const mongoose = require('mongoose')

module.exports = mongoose.model('welcome-channels', new mongoose.Schema({
    Guild: String,
    Channel: String,
    Text: String,
}))
