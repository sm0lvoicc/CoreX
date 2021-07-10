const { Client, Message, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "changemymind",
  description: "Try changing my mind.",
  timeout: 5000,
  aliases: ["mindchange", "changemind"],
  usage: "<text>",
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args.join(" ");

    if (!text) return message.reply("Breh, provide some text ;-;");

    let image = await Canvas.changemymind(text);

    let changeMyMind = new MessageAttachment(image, "cmm.png");

    message.channel.send(changeMyMind);
  },
};
