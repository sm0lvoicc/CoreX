const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Guild: String,
  Anti_Raid: { type: String, defualt: false },
  Anti_Spam: { type: String, default: false },
  Anti_Curse: { type: String, default: false },
  Anti_Link: { type: String, default: false },
  Anti_Invite: { type: String, default: false },
});

module.exports = mongoose.model("Automod", Schema);
