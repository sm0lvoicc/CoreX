const prefixSchema = require("../../models/prefix");
const { Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "prefix",
  description: "Changes the bot prefix.",
  timeout: 7000,
  usage: "<prefix>",
  aliases: ["setprefix", "set-prefix"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    const res = await args.join(" ");
    if (!res)
      return message.channel.send("Please specify a prefix to change to.");
    prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.delete();
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send(
          new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(
              `${emoji.success} Server prefix has been updated to \`${res}\``,
            )
            .setTimestamp(),
        );
      } else {
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send(
          new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(
              `${emoji.success} Custom prefix in this server is now set to \`${res}\``,
            )
            .setTimestamp(),
        );
      }
    });
  },
};
