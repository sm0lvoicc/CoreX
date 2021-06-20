const mongoose = require('mongoose');

let Schema = ({
    guildId: String,
    User: String,
    content: Array
});

module.exports = mongoose.model('warns', Schema);