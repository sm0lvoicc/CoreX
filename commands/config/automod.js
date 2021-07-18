const { Client, Message, MessageEmbed, MessageFlags } = require("discord.js");
const db = require("quick.db");
const emoji = require("../../emoji.json");
module.exports = {
  name: "automod",
  description: "Setup automod for the server",
  timeout: 3000,
  usage: "<No.>",
  aliases: ["auto-mod"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["MANAGE_SERVER"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    const prefix = await client.prefix(message);

    const raid = db.fetch(`Anti-raid_${message.guild.id}`);
    const spam = db.fetch(`Anti-spam_${message.guild.id}`);
    const curse = db.fetch(`Anti-curse_${message.guild.id}`);
    const link = db.fetch(`Anti-link_${message.guild.id}`);
    const invite = db.fetch(`Anti-invite_${message.guild.id}`);

    const embed = new MessageEmbed()
      .setColor("BLURPLE")
      .setTitle(`Type ${prefix}automod <No.> To enable or disable`)
      .setDescription(
        `\`[1]\`• Anti-Raid\n\`[2]\`• Anti-Spam\n\`[3]\`• Anti-Curse\n\`[4]\`• Anti-Link\n\`[5]\`• Anti-Invite\n\`[6]\`• Disable All`,
      );

    if (!args[0]) return message.channel.send(embed);
    if (args[0] === "1") {
      if (raid === null) {
        db.set(`Anti-raid_${message.guild.id}`, true);
        message.channel
          .send(`${emoji.success} Anti-Raid has been enabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      } else {
        db.delete(`Anti-raid_${message.guild.id}`);
        message.channel
          .send(`${emoji.success} Anti-Raid has been disabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    } else if (args[0] === "2") {
      if (spam === null) {
        db.set(`Anti-spam_${message.guild.id}`, true);
        message.channel
          .send(`${emoji.success} Anti-Spam has been enabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      } else {
        db.delete(`Anti-spam_${message.guild.id}`);
        message.channel
          .send(`${emoji.success} Anti-Spam has been disabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    } else if (args[0] === "3") {
      if (curse === null) {
        db.set(`Anti-curse_${message.guild.id}`, true);
        message.channel
          .send(`${emoji.success} Anti-Curse has been enabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      } else {
        db.delete(`Anti-curse_${message.guild.id}`);
        message.channel
          .send(`${emoji.success} Anti-Curse has been disabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    } else if (args[0] === "4") {
      if (link === null) {
        db.set(`Anti-link_${message.guild.id}`, true);
        message.channel
          .send(`${emoji.success} Anti-Link has been enabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      } else {
        db.delete(`Anti-link_${message.guild.id}`);
        message.channel
          .send(`${emoji.success} Anti-Link has been disabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    } else if (args[0] === "5") {
      if (invite === null) {
        db.set(`Anti-invite_${message.guild.id}`, true);
        message.channel
          .send(`${emoji.success} Anti-Invite has been enabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      } else {
        db.delete(`Anti-invite_${message.guild.id}`);
        message.channel
          .send(`${emoji.success} Anti-Invite has been disabled`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    } else if (args[0] === "6") {
      if (raid) {
        db.delete(`Anti-raid_${message.guild.id}`);
      }
      if (spam) {
        db.delete(`Anti-spam_${message.guild.id}`);
      }
      if (curse) {
        db.delete(`Anti-curse_${message.guild.id}`);
      }
      if (link) {
        db.delete(`Anti-link_${message.guild.id}`);
      }
      if (invite) {
        db.delete(`Anti-invite_${message.guild.id}`);
      }
      message.channel
        .send(`${emoji.success} Automod has been disabled successfully`)
        .then((msg) => msg.delete({ timeout: 1500 }));
    }
  },
};
