const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
const db = require("quick.db");

module.exports = {
  name: "set-suggest",
  description: "Set suggestion channel",
  timeout: 2000,
  usage: "<#channel>",
  aliases: ["setsuggest"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first();

    if (!channel)
      return message.channel.send(`Please specify a channel to set.`);

    if (channel.type === "voice")
      return message.channel.send(
        `${emoji.error} Please specify a text channel`,
      );
    await db.set(`suggestions_${message.guild.id}`, channel.id);

    message.channel.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `${emoji.success} Set suggestion channel to ${channel}`,
        ),
    );
  },
};
