const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require(`../../emoji.json`);

module.exports = {
  name: "remove-role",
  description: "Removes a specified role from a user.",
  timeout: 1000 * 5,
  usage: "<@user | user.id> <role name>",
  aliases: ["r-role", "removerole"],
  userPerms: ["MANAGE_ROLES"],
  clientPerms: ["MANAGE_ROLES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let member = message.mentions.members.first();
      if (!member) {
        member = await message.guild.members.cache.get(args[0]);
      }

      if (!member) return message.channel.send("That user is not valid.");

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

      if (userRolePossition <= rolePosition)
        return message.reply(
          "You cannot add that role due to role heirarchy issues.",
        );
      if (botRolePosition <= rolePosition)
        return message.reply(
          "I cannot add that role due to role heirarchy issues.",
        );
      if (userRolePossition <= member.roles.highest.position)
        message.channel.send(
          "You cannot add that role to that user due to role heirarchy issues.",
        );
      if (botRolePosition <= member.roles.highest.position)
        message.channel.send(
          "You cannot add that role to that user due to role heirarchy issues.",
        );

      member.roles.remove(role).catch((e) => {
        return message.channel.send(`${emoji.error} **Error:**\n${e}`);
      });

      const be = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Role Removed!")
        .setDescription(
          `${emoji.success} Removed the **${rname}** role from ${member}`,
        );
      message.channel.send(be);
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
