const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const schema = require("../../models/mutes");
const emoji = require("../../emoji.json");

module.exports = {
  name: "tempmute",
  description: "Temp mutes mentioned member",
  timeout: 10000,
  usage: "<@member || member.id> <time> [reason]",
  aliases: ["t-mute", "temp-mute"],
  userPerms: ["MANAGE_ROLES"],
  clientPerms: ["MANAGE_ROLES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const prefix = await client.prefix(message);

      let member = message.mentions.members.first();
      if (!member) {
        member = message.guild.members.cache.get(args[0]);
      }
      if (!member)
        return message.channel.send("Please mention a user to tempmute");

      const time = args[1];
      const muteReason = args.slice(2).join(" ") || "No reason specified";

      if (member.user.id === message.author.id)
        return message.channel.send(`You cannot mute yourself`);
      if (!time)
        return message.channel.send(`Please set a time to mute the user for.`);
      if (member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          `${emoji.error} I cannot mute a member with \`ADMINISTRATOR\``,
        );

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          message.channel.send(
            `${emoji.error} No Muted role found! Please set the mute role using ${prefix}set-muterole <@role>`,
          );
        } else {
          const MuteRole = message.guild.roles.cache.find(
            (role) => role.id === data.Role,
          );
          if (!MuteRole)
            return message.channel.send(
              `${emoji.error} The Muted Role for this server was deleted. Please set the mute role using ${prefix}set-muterole <@role>`,
            );

          if (member.roles.cache.get(MuteRole.id))
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
              `${emoji.error} You cannot tempmute this member due to role heirarchy issues`,
            );
          if (
            message.guild.me.roles.highest.position <=
            member.roles.highest.permission
          )
            return message.channel.send(
              `${emoji.error} I cannot tempmute this member due to role heirarchy issues.`,
            );

          if (MuteRole.position >= message.guild.me.roles.highest.position)
            return message.channel.send(
              `${emoji.error} I cannot access the mute role due to role heirarchy issues.`,
            );
          await member.roles.add(MuteRole.id);

          message.channel
            .send(
              new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                  `${emoji.success} ${member} has been tempmuted for: ${time} because: \`${muteReason}\``,
                )
                .setTimestamp(),
            )
            .catch((err) => console.log(err));

          const dmEmbed = new MessageEmbed()
            .setTitle(`Tempmute!`)
            .addField(`Muted User:`, `${member.user.tag} (You)`, true)
            .addField(`Action By:`, message.author.tag, true)
            .addField(`Muted In:`, message.guild.name, true)
            .addField(`Reason:`, muteReason)
            .addField("Duration", time);

          try {
            await member.send(dmEmbed);
          } catch (e) {
            message.channel.send(
              `${emoji.error} I could not DM the user! Reason logged.`,
            );
            message.channel.send(`There has been an error, **${e}**`);
          }
          setTimeout(async function () {
            await member.roles.remove(MuteRole.id);
            message.channel.send(
              new MessageEmbed()
                .setDescription(
                  `${emoji.success} ${member.user.username} was unmuted || Reason: \`Mute Duration was expired\``,
                )
                .setColor("GREEN")
                .setFooter(
                  `Requested by ${message.author.tag}`,
                  message.author.displayAvatarURL({ dynamic: true }),
                ),
            );
          }, ms(time));
        }
      });
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
    client.modlogs(
      {
        Member: member,
        Color: "RED",
        Reason: muteReason,
        Action: "Tempmute",
      },
      message,
    );
  },
};
