const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emoji = require("../../emoji.json");
module.exports = {
  name: "automod-status",
  description: "Shows the Automod status",
  timeout: 2000,
  usage: "",
  aliases: [""],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const raid = db.fetch(`Anti-raid_${message.guild.id}`);
    const spam = db.fetch(`Anti-spam_${message.guild.id}`);
    const curse = db.fetch(`Anti-curse_${message.guild.id}`);
    const link = db.fetch(`Anti-link_${message.guild.id}`);
    const invite = db.fetch(`Anti-invite_${message.guild.id}`);

    let antiRaid;
    let antiSpam;
    let antiCurse;
    let antiLink;
    let antiInvite;
    if (raid) {
      antiRaid = `\`[1]\`• Anti-Raid ${emoji.success}`;
    } else {
      antiRaid = `\`[1]\`• Anti-Raid ${emoji.error}`;
    }
    if (spam) {
      antiSpam = `\`[2]\`• Anti-Spam ${emoji.success}`;
    } else {
      antiSpam = `\`[2]\`• Anti-Spam ${emoji.error}`;
    }
    if (curse) {
      antiCurse = `\`[3]\`• Anti-Curse ${emoji.success}`;
    } else {
      antiCurse = `\`[3]\`• Anti-Curse ${emoji.error}`;
    }
    if (link) {
      antiLink = `\`[4]\`• Anti-Link ${emoji.success}`;
    } else {
      antiLink = `\`[4]\`• Anti-Link ${emoji.error}`;
    }
    if (invite) {
      antiInvite = `\`[5]\`• Anti-Invite ${emoji.success}`;
    } else {
      antiInvite = `\`[5]\`• Anti-Invite ${emoji.error}`;
    }
    const statusEmbed = new MessageEmbed()
      .setColor(`BLURPLE`)
      .setTitle("Automod Status")
      .setDescription(
        `${antiRaid}\n${antiSpam}\n${antiCurse}\n${antiLink}\n${antiInvite}`,
      );
    message.channel.send(statusEmbed);
  },
};
