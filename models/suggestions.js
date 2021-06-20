const mongoose = require('mongoose')

module.exports = mongoose.model('suggest', new mongoose.Schema({
    Guild: String,
    Channel: String,
}))