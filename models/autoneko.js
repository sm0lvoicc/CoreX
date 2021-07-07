const { Schema, model } = require('mongoose');

module.exports = model('autoneko', new Schema({
    Guild: String,
    Channel: String
}))