const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/welcome-channels");
const emoji = require("../../emoji.json");

module.exports = {
  name: "enable-welcome",
  description: "Enables the welcome message in your server.",
  timeout: 6000,
  usage: "<#channel> <message>",
  aliases: ["e-welcome", "enablewelcome"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel = await message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        "Please mention a channel to set as the welcome channel.",
      );

    const text = args.slice(1).join(" ");
    const noText = new MessageEmbed()
      .setTitle(`${emoji.settings} Available tags`)
      .setDescription(
        ` **{user}** : @New-Member \n **{server}** : Server Name \n **{user.tag}** : New-Member-Tag \n **{user.id}** : New-Member-ID \n **{membercount}** : Total Members`,
      )
      .setFooter(`More Soon`)
      .setColor("RANDOM");

    if (!text) return message.channel.send(noText);

    if (
      !channel
        .permissionsFor(message.guild.me)
        .has(["VIEW_CHANNEL", "SEND_MESSAGES"])
    ) {
      try {
        message.member.send(
          `${emoji.error} I need the permissions \`VIEW_CHANNEL\` and \`SEND_MESSAGES\` in the welcome channel`,
        );
      } catch (e) {
        const NoPerm = guild.channels.cache.find(
          (ch) =>
            ch.type === "text" &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES"),
        );
        NoPerm.send(`${emoji.error} ${message.member} I tried to DM You with the error: ${e},
          I cannot send messages to ${channel} due to permission errors
          `);
      }
    }

    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) data.delete();
      new schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Text: text,
      }).save();
      const messageWelcome = text
        .replace(/{user}/, `<@${message.author.id}>`)
        .replace(/{user.tag}/, message.author.tag)
        .replace(/{server}/, message.guild.name)
        .replace(/{user.id}/, message.author.id)
        .replace(/{membercount}/, message.guild.memberCount);
      channel.send(messageWelcome);
    });
  },
};
