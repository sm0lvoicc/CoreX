const { Client, Message, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "fuse",
  timeout: 5000,
  description: "Slaps mentioned person.",
  usage: "<@user>",
  aliases: ["merge"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    if (!user)
      return message.reply("Dumb, you can't fuse your avatar with air.");

    const avatar = user.displayAvatarURL({ format: "png" });
    const avatar2 = message.author.displayAvatarURL({ format: "png" });

    const image = await Canvas.fuse(avatar2, avatar);

    message.channel.send(new MessageAttachment(image, "image.gif"));
  },
};
