const client = require("../index");
//Models
const ghost_ping = require("../models/ghostping");
const modlogs = require("../models/modlogs");
const mutes = require("../models/mutes");
const notes = require("../models/notes");
const warns = require("../models/warns");
const logs = require("../models/logs");

client.on("guildDelete", async (guild) => {
  ghost_ping.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      ghost_ping.findOneAndDelete({ Guild: guild.id });
    }
  });

  modlogs.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      modlogs.findOneAndDelete({ Guild: guild.id });
    }
  });

  mutes.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      mutes.findOneAndDelete({ Guild: guild.id });
    }
  });

  notes.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      notes.findOneAndDelete({ Guild: guild.id });
    }
  });

  warns.findOne({ guildId: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      warns.findOneAndDelete({ guildId: guild.id });
    }
  });

  logs.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      logs.findOneAndDelete({ Guild: guild.id });
    }
  });
});
