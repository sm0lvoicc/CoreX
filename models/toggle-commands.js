const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Guild: {
    type: String,
    required: true,
  },
  disabledCmd: Array,
});

module.exports = mongoose.model("Guild", guildSchema);
