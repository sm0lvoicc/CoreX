const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("../../models/notes");
const emoji = require(`../../emoji.json`);

module.exports = {
  name: "clear-notes",
  description: "Clears notes of a specified user.",
  timeout: 8000,
  usage: "<@user | user.id>",
  aliases: ["c-notes", "clearnotes"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [""],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = message.mentions.members.first();
    if (!user) {
      user = message.guild.members.cache.get(args[0]);
    }
    if (!user) return message.channel.send("Please specify a user.");

    if (user.user.id === message.author.id)
      return message.channel.send(
        `${emoji.error} You cannot clear your own notes.`,
      );

    db.findOne(
      { guildid: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          await db.findOneAndDelete({
            user: user.user.id,
            guildid: message.guild.id,
          });
          message.channel.send(
            new MessageEmbed()
              .setDescription(
                `${emoji.success} Cleared all the notes of **${user.user.username}**`,
              )
              .setTimestamp()
              .setColor("GREEN"),
          );
        } else {
          message.channel.send(
            new MessageEmbed()
              .setDescription(
                `${emoji.error} **${user.user.tag}** doesn't have any notes.`,
              )
              .setColor("RED"),
          );
        }
      },
    );
  },
};
