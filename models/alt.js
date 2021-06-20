const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild : String,
    Avatar: { type: Boolean, default: false},
    Days: Number,
    Allowed_Alts: Array
})

module.exports = mongoose.model('alt', Schema)