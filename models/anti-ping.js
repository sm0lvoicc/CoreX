const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Guild: String,
  Member: Array,
});

module.exports = mongoose.model("anti-ping", Schema);
