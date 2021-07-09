const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: String,
    memberCounterTotal: { type: String, required: false},
    memberCounterUser: { type: String, required: false},
    memberCounterBot: { type: String, required: false},

});

module.exports = new mongoose.model('membercount', guildSchema, 'membercount');