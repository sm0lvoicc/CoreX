const mongoose = require('mongoose')

module.exports = mongoose.model('mutes', new mongoose.Schema({
    Guild: String,
    Role: String,
}))