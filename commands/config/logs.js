const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/logs");
const emoji = require("../../emoji.json");

module.exports = {
  name: "logs",
  description: "Setup the logs channel for the server",
  timeout: 3000,
  usage: "<#channel>",
  aliases: ["logchannel", "log-channel", "set-logs"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first();
    if (!channel) {
      await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            `${emoji.error} The logs channel is already disabled`,
          );
        data.delete();
        await message.channel.send(
          `${emoji.success} logs channel has been disabled`,
        );
      });
    } else {
      await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (
          !channel
            .permissionsFor(message.guild.me)
            .has(["VIEW_CHANNEL", "SEND_MESSAGES"])
        ) {
          message.channel.send(
            `${emoji.error} I need the permissions \`VIEW_CHANNEL\` and \`SEND_MESSAGES\` in the logs channel`,
          );
        }
        if (!data) {
          const newData = schema({
            Guild: message.guild.id,
            Channel: channel.id,
          });
          newData.save();
          message.channel.send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${emoji.success} The logs channel has been set to ${channel}`,
              ),
          );
        } else {
          data.delete();
          const idkData = schema({
            Guild: message.guild.id,
            Channel: channel.id,
          });
          idkData.save();
          message.channel.send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${emoji.success} The logs channel has been set to ${channel}`,
              ),
          );
        }
      });
    }
  },
};
