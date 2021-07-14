const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
const db = require("quick.db");

module.exports = {
  name: "suggest",
  description: "Suggest something for the server.",
  timeout: 5000,
  usage: "<suggestion>",
  aliases: [""],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel = await db.fetch(`suggestions_${message.guild.id}`);
    if (channel === null)
      return message.channel.send(
        `${emoji.error} The suggestion channel has not been set`,
      );

    const suggestion = args.join(" ");
    if (!suggestion)
      return messsage.channel.send(`Please specify something to suggest`);
    if (suggestion.length > 256)
      return message.lineReply(
        `${emoji.error} Suggestion Text must be 256 or fewer in length`,
      );

    const suggestEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(suggestion)
      .setTimestamp();

    const msg = await message.guild.channels.cache
      .get(channel)
      .send(suggestEmbed);
    await msg.react(emoji.success);
    await msg.react(emoji.neutral);
    await msg.react(emoji.error);

    message.channel.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${emoji.success} Your Suggestion has been sent`),
    );
  },
};
