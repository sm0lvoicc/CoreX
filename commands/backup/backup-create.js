const { Client, Message, MessageEmbed } = require("discord.js");
const backup = require("discord-backup");
const emoji = require("../../emoji.json");

module.exports = {
  name: "backup-create",
  description: "Creates a backup of your server.",
  timeout: 50000,
  usage: "",
  aliases: ["b-create", "backupcreate", "bcreate"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["ADMINISTRATOR"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      `${emoji.loading} **Creating Backup...**`,
    );
    try {
      backup
        .create(message.guild, {
          maxMessagesPerChannel: 0,
          jsonSave: true,
          jsonBeautify: true,
        })
        .then((b) => {
          msg.delete();
          message.channel.send(
            new MessageEmbed()
              .setDescription(
                `${emoji.success} Backup Created: \`${b.id}\`. Make sure to remember this code`,
              )
              .setColor("BLURPLE"),
          );
        });
    } catch (err) {
      msg.delete();
      message.channel.send(`There has been an error. **${error}**`);
    }
  },
};
