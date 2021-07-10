const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/leave-channels");
const emoji = require("../../emoji.json");

module.exports = {
  name: "enable-leave",
  description: "Enables the leave message in your server.",
  timeout: 6000,
  usage: "<#channel> <message>",
  aliases: ["e-leave", "enableleave"],
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
        "Please mention a channel to set as the leave channel.",
      );

    const text = args.slice(1).join(" ");
    if (!text)
      message.channel.send(
        new MessageEmbed()
          .setTitle(`${emoji.settings} Available Tags`)
          .setFooter(`More Soon`)
          .setColor("RANDOM")
          .setDescription(
            `**{user}** : @New-Member \n **{server}** : Server Name \n **{user.tag}** : New-Member-Tag \n **{user.id}** : New-Member-ID \n **{membercount}** : Total Members`,
          ),
      );

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
                 I cannot send leave messages, I need the permissions \`VIEW_CHANNEL\` and \`SEND_MESSAGES\` in ${channel}
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
      const messageLeave = text
        .replace(/{user}/, `<@${message.author.id}>`)
        .replace(/{user.tag}/, message.author.tag)
        .replace(/{server}/, message.guild.name)
        .replace(/{user.id}/, message.author.id)
        .replace(/{membercount}/, message.guild.memberCount);
      channel.send(messageLeave);
    });
  },
};
