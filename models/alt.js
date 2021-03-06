const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild : String,
    Avatar: { type: Boolean, default: false},
    Days: Number,
    Allowed_Alts: Array,
    Channel: String,
})

module.exports = mongoose.model('alt', Schema)