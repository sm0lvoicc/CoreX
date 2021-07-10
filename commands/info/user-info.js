const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "user-info",
  description: "Shows info about a user.",
  timeout: 1000,
  aliases: ["userinfo", "whois", "who-is"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let status;
    switch (user.presence.status) {
      case "online":
        status = `${emoji.online} Online`;
        break;
      case "dnd":
        status = `${emoji.dnd} DND`;
        break;
      case "idle":
        status = `${emoji.idle} Idle`;
        break;
      case "offline":
        status = `${emoji.offline} Offline`;
        break;
    }

    const embed = new MessageEmbed()
      .setTitle(`${emoji.info} ${user.user.username} infos`)
      .setColor(`BLURPLE`)
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: `${emoji.mention} Name: `,
          value: user.user.username,
          inline: true,
        },
        {
          name: `${emoji.channel} Discriminator: `,
          value: `#${user.user.discriminator}`,
          inline: true,
        },
        {
          name: `${emoji.active} Current Status: `,
          value: status,
          inline: true,
        },
        {
          name: `${emoji.id} ID: `,
          value: user.user.id,
        },
        {
          name: `${emoji.desktop} Activity: `,
          value: user.presence.activities[0]
            ? user.presence.activities[0].name
            : `No game`,
          inline: true,
        },
        {
          name: `${emoji.inbox} Creation Date: `,
          value: user.user.createdAt.toLocaleDateString("en-us"),
          inline: true,
        },
        {
          name: `${emoji.join} Joined Date: `,
          value: user.joinedAt.toLocaleDateString("en-us"),
          inline: true,
        },
        {
          name: `${emoji.mention} User Roles: `,
          value: user.roles.cache.map((role) => role.toString()).join(" ,"),
          inline: true,
        },
      );

    await message.channel.send(embed);
  },
};
