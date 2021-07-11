const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "create-role",
  description: "Creates a role with a given hex color",
  timeout: 3000,
  usage: "<role> <hex>",
  aliases: ["createrole", "role-create", "role-create"],
  userPerms: ["MANAGE_ROLES"],
  clientPerms: ["MANAGE_ROLES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let roleName = args[0].join(" ");
    let roleColor;

    args.forEach((arg) => {
      if (arg.startsWith("#")) {
        let roleColor = arg;
      }
    });

    if (!roleName) {
      return message.channel.send(`${emoji.error} Please specify a role name`);
    }

    if (!roleColor) {
      let roleColor = "#d3d3d3";
    }

    let roleName = roleName.replace(`${roleColor}`, "");

    if (roleColor >= 16777215 || roleColor <= 0)
      return message.channel.send(
        `${emoji.error} Please specify a real hex code`,
      );

    let createRole = await message.guild.roles.create({
      data: {
        name: roleName,
        color: roleColor,
      },
    });

    const embed = new MessageEmbed()
      .setTitle(`${emoji.success} Created a role`)
      .setDescription(`Created ${roleName} with Color ${roleColor}`)
      .setColor(roleColor)
      .setTimestamp();

    message.channel.send(embed);
  },
};
