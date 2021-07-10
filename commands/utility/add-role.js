const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require(`../../emoji.json`);

module.exports = {
  name: "add-role",
  usage: "<@user | user-id> <rolename>",
  aliases: ["addrole"],
  timeout: 1000 * 5,
  description: "Adds a role to a user",
  userPerms: ["MANAGE_ROLES"],
  clientPerms: ["MANAGE_ROLES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns
   */
  run: async (client, message, args) => {
    try {
      let member = message.mentions.members.first();
      if (!member) {
        member = await message.guild.members.cache.get(args[0]);
      }

      if (!member) return message.reply("That user is not valid.");

      const rname = message.content.split(" ").splice(2).join(" ");
      const role = message.guild.roles.cache.find((val) => val.name === rname);
      if (!role)
        return message.channel.send(
          `${emoji.error} ${rname} isn't a role on this server!`,
        );

      const botRolePosition = message.guild.member(client.user).roles.highest
        .position;
      const rolePosition = role.position;
      const userRolePossition = message.member.roles.highest.position;

      if (userRolePossition < rolePosition)
        return message.reply("The target role has a higher position than you.");
      if (botRolePosition < rolePosition)
        return message.reply("The target role has a higher position than me.");
      if (userRolePossition < member.roles.highest.position)
        message.channel.send("The target has a higher position than you.");
      if (botRolePosition < member.roles.highest.position)
        message.channel.send("The target has a higher position than me.");

      member.roles.add(role).catch((e) => {
        return message.channel.send(`${emoji.error} **Error:**\n${e}`);
      });

      const be = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Role Added!")
        .setDescription(
          `${emoji.success} **${message.author}**, I've added the **${rname}** role to **${member.user.tag}**`,
        );
      message.channel.send(be);
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
