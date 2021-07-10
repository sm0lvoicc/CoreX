const { Client, Message, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "jail",
  timeout: 5000,
  description: "Avatar is jailed.",
  usage: "[@user]",
  aliases: ["prison"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.jail(avatar, 1);

    message.channel.send(new MessageAttachment(image, "image.gif"));
  },
};
