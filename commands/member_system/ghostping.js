const Schema = require("../../models/ghostping");
const emoji = require("../../emoji.json");

module.exports = {
  name: "ghostping",
  description: "Enable/Disable Anti Ghost Ping Module",
  aliases: ["ghost-ping"],
  timeout: "10000",
  usage: "<enable/disable>",
  primeOnly: true,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    options = ["enable", "disable"];

    if (!args.length)
      return message.channel.send(
        "Please enter either **enable** or **disable**",
      );
    const opt = args[0].toLowerCase();
    if (!opt)
      return message.channel.send(
        "Please enter either **enable** or **disable**",
      );

    if (!options.includes(opt))
      return message.channel.send(
        "Please enter either **enable** or **disable**",
      );

    if (opt == "enable") {
      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data)
          return message.channel.send(
            `${emoji.error} Anti Ghost Ping Module is enabled already`,
          );
        new Schema({
          Guild: message.guild.id,
        }).save();
        message.channel.send(
          `${emoji.success} Anti Ghost Ping Module has been enabled.`,
        );
      });
    }

    if (opt == "disable") {
      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            `${emoji.error} Anti Ghost Ping Module is disabled already`,
          );
        data.delete();
        message.channel.send(
          `${emoji.success} Anti Ghost Ping Module has been disabled.`,
        );
      });
    }
  },
};
