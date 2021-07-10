const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "server-icon",
  description: "Shows the server logo",
  timeout: 1000,
  usage: "",
  aliases: ["server-ic"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const serverIcon = new MessageEmbed()
      .setColor("BLURPLE")
      .setAuthor(
        `${message.guild.name}'s server icon`,
        message.guild.iconURL({ dynamic: true, size: 512 }),
      )
      .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true }),
      )
      .setTimestamp();

    message.channel.send(serverIcon);
  },
};
