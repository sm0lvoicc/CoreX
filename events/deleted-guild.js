const client = require("../index");
//Models
const anti_ad = require("../models/anti-ad");
const anti_link = require("../models/anti-link");
const anti_spam = require("../models/anti-spam");
const bad_word = require("../models/bad-word");
const ghost_ping = require("../models/ghostping");
const modlogs = require("../models/modlogs");
const mutes = require("../models/mutes");
const notes = require("../models/notes");
const suggestions = require("../models/suggestions");
const warns = require("../models/warns");
const autoMeme = require("../models/automeme");
const autoNeko = require("../models/autoneko");
const voiceLb = require("../models/voiceleaderboard");

client.on("guildDelete", async (guild) => {
  anti_ad.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      anti_ad.findOneAndDelete({ Guild: guild.id });
    }
  });

  anti_link.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      anti_link.findOneAndDelete({ Guild: guild.id });
    }
  });

  anti_spam.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      anti_spam.findOneAndDelete({ Guild: guild.id });
    }
  });

  bad_word.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      bad_word.findOneAndDelete({ Guild: guild.id });
    }
  });

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

  suggestions.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      suggestions.findOneAndDelete({ Guild: guild.id });
    }
  });

  warns.findOne({ guildId: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      warns.findOneAndDelete({ guildId: guild.id });
    }
  });

  autoMeme.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      autoMeme.findOneAndDelete({ Guild: guild.id });
    }
  });

  autoNeko.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      autoNeko.findOneAndDelete({ Guild: guild.id });
    }
  });

  voiceLb.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      voiceLb.findOneAndDelete({ Guild: guild.id });
    }
  });
});
