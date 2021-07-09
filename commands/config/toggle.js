const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
const schema = require("../../models/toggle-commands.js");
module.exports = {
  name: "toggle",
  description: "Enable or disable a command in the server.",
  timeout: 2000,
  usage: "<command-name>",
  aliases: ["toggle-cmd", "togglecmd", "toggle-command", "togglecommand"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const settings = await schema.findOne({ Guild: message.guild.id });

    const noCommands = ["help", "ping", "toggle", "premium", "get-premium"];

    noCommands.forEach((n) => {
      if (args[0].includes(n)) {
        return message.channel.send(
          `${emoji.error} You cannot disable that command`,
        );
      }
    });
    const command = client.commands.get(args[0]);
    if (!command) return message.channel.send(`This command doesn't exist`);

    const name = command.name;
    const disableCommands = settings.disabledCmd;

    if (!disableCommands.includes(name)) {
      settings.disableCmd.push(name);
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `${emoji.success} \`${name}\` has been successfully disabled`,
          )
          .setTimestamp(),
      );
    }

    if (disabledCommands.includes(name)) {
      settings.disableCmd.pull(name);
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `${emoji.success} \`${name}\` has been successfully enabled`,
          )
          .setTimestamp(),
      );
    }
    await settings.save();
  },
};
