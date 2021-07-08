const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require(`../../emoji.json`);

module.exports = {
  name: "ban",
  description: "Bans a specified member.",
  timeout: 10000,
  usage: "<@user | user.id> [reason]",
  userPerms: ["BAN_MEMBERS"],
  clientPerms: ["BAN_MEMBERS"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let member = message.mentions.members.first();
      let banReason = args[1];

      if (!member) {
        member = await message.guild.members.cache.get(args[0]);
      }

      if (!member) {
        message.channel.send("Please mention a member to ban.");
      }

      if (
        message.member.roles.highest.position <= member.roles.highest.permission
      )
        return message.channel.send(
          `${emoji.error} You cannot ban this member due to role heirarchy issues.`,
        );
      if (
        message.guild.me.roles.highest.position <=
        member.roles.highest.permission
      )
        return message.channel.send(
          `${emoji.error} I cannot ban this member due to role heirarchy issues.`,
        );

      if (member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          `${emoji.error} I cannot ban a member with \`ADMINISTRATOR\``,
        );

      if (!args[1]) {
        banReason = "No reason specified";
      } else if (args[1]) {
        banReason = args.slice(1).join(" ");
      }

      if (banReason.length > 1024) banReason = banReason.slice(0, 1021) + "...";

      const bannedEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          `${emoji.success} ${member} was banned by ${message.author} for: \`${banReason}`,
        );

      const dmEmbed = new MessageEmbed()
        .setTitle("Banned!")
        .setDescription(`You have been banned from **${message.guild}**!`)
        .addField("Moderator", message.member, true)
        .addField("Member", member, true)
        .addField("Reason", banReason)
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL({
            dynamic: true,
          }),
        )
        .setTimestamp()
        .setColor("RED");

      try {
        await member.send(dmEmbed);

        message.channel.send(
          `${emoji.success} I have successfully sent the reason to the user!`,
        );
      } catch (e) {
        message.channel.send(`There has been an error, **${e}**`);
      }

      try {
        await message.guild.members.ban(member.id, {
          reason: banReason,
        });

        message.channel.send(bannedEmbed);
      } catch (e) {
        message.channel.send(`There has been an error, **${e}**`);
      }

      client.modlogs(
        {
          Member: member,
          Color: "RED",
          Reason: banReason,
          Action: "Ban",
        },
        message,
      );
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
