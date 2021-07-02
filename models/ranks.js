const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Rank: String,
    Role: String
})

module.exports = mongoose.model('ranks', Schema)
