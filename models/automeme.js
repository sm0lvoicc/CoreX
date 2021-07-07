const { Schema, model } = require('mongoose');

module.exports = model('automeme', new Schema({
    Guild: String,
    Channel: String
}))