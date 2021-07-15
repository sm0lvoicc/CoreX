const { MessageEmbed } = require("discord.js");
const client = require("../../index.js");
const { invite } = require("../../config.json");
module.exports = {
  name: "invite",
  description: "Invite this bot to your server!",
  usage: "invite",
  timeout: 1000,
  aliases: ["inviteme"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`${message.client.user.username} Bot Invite`)
      .setColor(`RANDOM`)
      .setTimestamp()
      .setFooter(
        message.client.user.username,
        message.client.user.displayAvatarURL(),
      )
      .setThumbnail(message.client.user.avatarURL())
      .setDescription(
        `🗒️**Note:**\nThis bot requires \`ADMINISTRATOR\` permissions. Adding this bot will require you to give the bot all permissions on your server!`,
      )
      .addField(
        `**Links:**`,
        `[Bot Invite](https://dsc.gg/corex) | [Support Server](${invite})`,
      );

    message.channel.send(embed);
  },
};
