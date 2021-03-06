const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/dmjoin");
const emoji = require("../../emoji.json");

module.exports = {
  name: "dmjoin",
  description: "Enable/Disable dmjoin.",
  timeout: 3000,
  usage: "<enable> <text> || <disable>",
  aliases: ["dm-join", "joindm", "join-dm"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    options = ["enable", "disable"];

    if (!args.length)
      return message.channel.send(
        "Please enter either **enable** or **disable**",
      );
    const opt = args[0].toLowerCase();
    if (!opt)
      return message.reply("Please enter either **enable** or **disable**");

    if (!options.includes(opt))
      return message.channel.send(
        "Please enter either **enable** or **disable**",
      );

    if (opt == "enable") {
      const text = args.slice(1).join(" ");

      const noText = new MessageEmbed()
        .setTitle(`${emoji.settings} Available tags`)
        .setDescription(
          ` **{user}** : <@New-Member> \n **{server}** : Server Name \n **{user.tag}** : New-Member-Tag \n **{user.id}** : New-Member-ID \n **{membercount}** : Total Members`,
        )
        .setFooter(`More Soon`)
        .setColor("RANDOM");

      if (!text) return message.channel.send(noText);

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) data.delete();
        new schema({
          Guild: message.guild.id,
          Text: text,
        }).save();
        const dmjoin = text
          .replace(/{user}/, `<@${message.author.id}>`)
          .replace(/{server}/, message.guild.name)
          .replace(/{user.tag}/, message.author.tag)
          .replace(/{user.id}/, message.author.id)
          .replace(/{membercount}/, message.guild.memberCount);
        message.member.send(dmjoin);
      });
    }
    if (opt == "disable") {
      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            `${emoji.error} DM join is already disabled.`,
          );
        data.delete();
        message.channel.send(`${emoji.success}  DM join has been disabled.`);
      });
    }
  },
};
