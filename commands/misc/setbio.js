const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require(`../../models/bio`);
const emoji = require("../../emoji.json");

module.exports = {
  name: "setbio",
  timeout: 5000,
  description: "Sets/Updates your bio.",
  usage: "<text>",
  aliases: ["set-bio"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (args < 1) return message.channel.send("Please add text to your bio");
    Schema.findOne({ User: message.author.id }, async (err, data) => {
      if (data) data.delete();
      new Schema({
        User: message.author.id,
        Bio: args.join(" "),
      }).save();
    });
    message.channel.send(
      new MessageEmbed().setDescription(
        `${emoji.success} Successfully Updated Your Bio`,
      ),
    );
  },
};
