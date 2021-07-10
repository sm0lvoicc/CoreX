const db = require("../../models/warns");
const { Message, MessageEmbed } = require("discord.js");
const emoji = require(`../../emoji.json`);

module.exports = {
  name: "clear-warns",
  description: "Clears all the warns from the specified user.",
  timeout: 10000,
  usage: "<@user | user.id>",
  aliases: ["c-warns", "clearwarns"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [""],
  run: async (client, message, args) => {
    let member = message.mentions.members.first();

    if (!member) {
      member = await message.guild.members.cache.get(args[0]);
    }

    if (!member) {
      message.channel.send("Please mention a member");
    }

    db.findOne(
      { guildId: message.guild.id, user: member.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.delete();
          message.channel.send(
            new MessageEmbed()
              .setDescription(
                `${emoji.success} Cleared all the warns of **${member.user.username}**`,
              )
              .setTimestamp()
              .setColor("GREEN"),
          );
        } else {
          message.channel.send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${emoji.error} This user does not have any warns in this server!`,
              )
              .setTimestamp(),
          );
        }
      },
    );
  },
};
