const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/whitelist-channel");
const emoji = require("../../emoji.json");

module.exports = {
  name: "whitelist-word",
  description: "Whitelist channel from a Anti-curse",
  timeout: 3000,
  usage: "<add/remove/dislay <#channel>",
  aliases: ["wl-word", "wlword"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const options = ["add", "remove", "display"];

    if (!args.length)
      return message.channel.send(
        "Please enter either **add**, **remove** or **display**",
      );
    const opt = args[0].toLowerCase();
    if (!opt)
      return message.channel.send(
        "Please enter either **add**, **remove** or **display**",
      );

    if (!options.includes(opt))
      return message.channel.send(
        "Please enter either **add**, **remove** or **display**",
      );

    if (opt == "add") {
      const channel = message.mentions.channels.first();

      if (!channel)
        return message.channel.send("Please mention a channel to whitelist");

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          const newData = new schema({
            Guild: message.guild.id,
            Anti_curse: channel.id,
          });
          newData.save();
          message.channel.send(
            `${emoji.success} Whitelisted Bad Words in ${channel}`,
          );
        } else {
          if (data.Anti_curse.includes(channel.id))
            return message.reply(
              `${emoji.error} This channel is already whitelisted`,
            );
          data.Anti_curse.push(channel.id);
          data.save();
          message.channel.send(
            `${emoji.success} Whitelisted Bad Words in ${channel}`,
          );
        }
      });
    }

    if (opt == "remove") {
      const channel = message.mentions.channels.first();

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            `${emoji.error} There are no channels whitelisted`,
          );
        if (!data.Anti_curse.includes(channel.id))
          return message.channel.send(
            `${emoji.error} ${channel} is not whitelisted`,
          );
        const filtered = data.Anti_link.filter(
          (target) => target !== channel.id,
        );

        await schema.findOneAndUpdate({
          Guild: message.guild.id,
          Anti_curse: filtered,
        });

        message.channel.send(
          `${emoji.success} Removed whitelist from ${channel}`,
        );
      });
    }

    if (opt == "display") {
      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            `${emoji.error} There are no channels whitelisted`,
          );
        message.channel.send(
          new MessageEmbed()
            .setTitle(`${emoji.info} Whitelisted Channels`)
            .setDescription(
              `<#${
                data.Anti_curse.join(`> <#`) || `**No channels whitelisted**`
              }>`,
            )
            .setColor("RANDOM"),
        );
      });
    }
  },
};
