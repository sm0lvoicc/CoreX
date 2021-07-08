const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/mutes");
const emoji = require("../../emoji.json");

module.exports = {
  name: "mute",
  description: "Mutes mentioned member",
  timeout: 6000,
  usage: "<@member || member.id> [reason]",
  userPerms: ["MANAGE_ROLES"],
  clientPerms: ["MANAGE_ROLES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const prefix = client.prefix(message);

      let member = message.mentions.members.first();
      if (!member) {
        member = message.guild.members.cache.get(args[0]);
      }
      if (!member)
        return message.channel.send("Please mention a member to mute.");

      const muteReason = args.slice(1).join(" ") || "No reason specified.";

      if (member.user.id === message.author.id)
        return message.channel.send(`${emoji.error} You cannot mute yourself`);

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          message.channel.send(
            `${emoji.error} There seems to be no muted role set, use ${prefix}set-muterole <@role> to set one up!`,
          );
        } else {
          const roleD = message.guild.roles.cache.find(
            (role) => role.id === data.Role,
          );
          if (!roleD) {
            message.channel.send(
              `The muted role was deleted set it again using ${prefix}set-muterole <@role>`,
            );
            return data.delete();
          }

          if (member.roles.cache.get(roleD.id))
            return message.channel.send(
              new MessageEmbed()
                .setDescription(
                  `${emoji.error} **${member.user.username} was muted already. So I cannot mute them again**`,
                )
                .setColor("RED")
                .setFooter(
                  `Requested by ${message.author.tag}`,
                  message.author.displayAvatarURL({ dynamic: true }),
                ),
            );
          if (
            message.member.roles.highest.position <=
            member.roles.highest.permission
          )
            return message.channel.send(
              `${emoji.error} You cannot mute this member due to role heirarchy issues.`,
            );
          if (
            message.guild.me.roles.highest.position <=
            member.roles.highest.permission
          )
            return message.channel.send(
              `${emoji.error} I cannot mute this member due to role heirarchy issues.`,
            );
          if (roleD.position >= message.guild.me.roles.highest.position)
            return message.channel.send(
              `${emoji.error} I cannot access the mute role due to role heirarchy issues.`,
            );

          if (member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
              `${emoji.error} I cannot mute a member with \`ADMINISTRATOR\``,
            );
          if (roleD.deleteable)
            return message.channel.send(
              new MessageEmbed()
                .setDescription(
                  `${emoji.error} I can't add muted role manually`,
                )
                .setColor("RED")
                .setFooter(
                  `Requested by ${message.author.tag}`,
                  message.author.displayAvatarURL({ dynamic: true }),
                ),
            );

          await member.roles.add(roleD.id);

          message.channel
            .send(
              new MessageEmbed()
                .setColor("RED")
                .setDescription(
                  `${emoji.success} ${member} was muted by ${message.author} for: \`${muteReason}\``,
                )
                .setTimestamp(),
            )
            .catch((e) => {
              message.channel.send(`There has been an error, **${e}**`);
            });

          const dmEmbed = new MessageEmbed()
            .setTitle(`Muted!`)
            .addField(`Moderator:`, message.author.tag, true)
            .addField(`Muted In:`, message.guild.name, true)
            .addField(`Reason:`, muteReason);

          try {
            await member.send(dmEmbed);
          } catch (e) {
            message.channel.send("I could not DM the user!");
            message.channel.send(`There has been an error, **${e}**`);
          }
        }
      });

      client.modlogs(
        {
          Member: member,
          Color: "RED",
          Reason: muteReason,
          Action: "Mute",
        },
        message,
      );
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
