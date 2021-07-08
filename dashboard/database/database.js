const mongoose = require("mongoose");
const config = require("../../config.json")
module.exports = mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
