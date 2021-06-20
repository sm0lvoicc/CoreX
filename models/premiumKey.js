const { Schema, model } = require("mongoose");

module.exports = model(
  "prime-keys",
  new Schema({
    Key: String,
  })
);