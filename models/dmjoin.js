const mongoose = require('mongoose')

module.exports = mongoose.model('dmjoin', new mongoose.Schema({
    Guild: String,
    Text: String,
}))