const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "unlock",
  description: "Unlocks a locked channel.",
  timeout: 5000,
  usage: "<#channel>",
  aliases: ["un-lock"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["MANAGE_CHANNELS"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let channel = message.mentions.channels.first();
      if (!channel) {
        channel = message.channel;
      }
      if (!channel) return message.channel.send("Mention a channel to unlock");
      const everyone = message.guild.roles.cache.find(
        (role) => role.name == "@everyone",
      );
      if (channel.permissionsFor(everyone).has(["SEND_MESSAGES"]))
        return message.channel.send(
          `${emoji.error} This channel is already unlocked.`,
        );
      await channel.createOverwrite(
        client.user,
        {
          SEND_MESSAGES: null,
        },
        `CoreX Moderation - Unlock Command - Actioned By: ${message.author.tag}`,
      );
      await channel.updateOverwrite(
        everyone,
        {
          SEND_MESSAGES: null,
        },
        `CoreX Moderation - Unlock Command - Action By: ${message.author.tag}`,
      );
      channel
        .send(
          new MessageEmbed()
            .setDescription(
              `${emoji.lock} **${message.author.tag}** unlocked this channel`,
            )
            .setColor("GREEN"),
        )
        .catch((err) => {
          message.channel.send(`There has been an error, **${err}**`);
        });
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
