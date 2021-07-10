const schema = require("../../models/mutes");
const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "set-muterole",
  usage: "<@Role>",
  description: "Set/Check Mute Role of a server",
  aliases: ["mrole", "set-mrole", "setmuterole", "setmrole"],
  timeout: "5000",
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_ROLES"],
  run: async (client, message, args) => {
    try {
      const role =
        (await message.mentions.roles.first()) ||
        message.guild.roles.cache.get(args[0]);

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
          if (!role)
            return message.channel.send(
              new MessageEmbed()
                .setTitle(`${emoji.inbox} Server 's Mute Role`)
                .setDescription(`${emoji.mention} **Role: <@&${data.Role}>**`)
                .setColor("BLURPLE"),
            );
          await data.delete();
          data2 = new schema({
            Guild: message.guild.id,
            Role: role.id,
          });
          data2.save();
          message.channel.send(
            new MessageEmbed()
              .setTitle(`${emoji.info} Mute Role Updated`)
              .setDescription(`${emoji.mention} **Role: ${role}**`)
              .setColor("BLURPLE"),
          );
        } else {
          if (!role)
            return message.channel.send(
              new MessageEmbed()
                .setTitle(`${emoji.inbox} Server 's Mute Role`)
                .setDescription(`${emoji.mention} **Role: Not Set**`)
                .setColor("BLURPLE"),
            );
          data = new schema({
            Guild: message.guild.id,
            Role: role.id,
          });
          message.channel.send(
            new MessageEmbed()
              .setTitle(`${emoji.info} Mute Role Updated`)
              .setDescription(
                `${emoji.mention} **Role: ${role}\nActioned By: ${message.author.tag}**`,
              )
              .setColor("BLURPLE"),
          );
          data.save();
        }
      });
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
