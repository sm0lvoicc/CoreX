const { Client, Message, MessageEmbed } = require("discord.js");
const { invite } = require("../../config.json");
module.exports = {
  name: "invite",
  description: "Invite me to your server!",
  timeout: 1000,
  usage: "",
  aliases: ["inviteme"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(
        `**__[Invite me](https://dsc.gg/corex)__**\n**__[Join my server](${invite})__**`,
      )
      .setTimestamp();
    message.channel.send(embed);
  },
};
