const mongoose = require('mongoose')

module.exports = mongoose.model('leave-channels', new mongoose.Schema({
    Guild: String,
    Channel: String,
    Text: String,
}))