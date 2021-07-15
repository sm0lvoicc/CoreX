const client = require("../index");
const schema = require("../models/logs");
const { MessageEmbed } = require("discord.js");

client.on("roleCreate", async (role) => {
  if (!role.guild) return;
  await schema.findOne({ Guild: role.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    const channel = role.guild.channels.cache.get(data.Channel);

    if (!channel || channel.available) return;

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("Role Created", role.guild.iconURL())
      .addField("Role Name", role)
      .addField("Role ID", role.id)
      .setTimestamp();
    channel.send(embed);
  });
});

client.on("roleDelete", async (role) => {
  if (!role.guild) return;
  await schema.findOne({ Guild: role.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    const channel = role.guild.channels.cache.get(data.Channel);

    if (!channel || channel.available) return;

    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor("Role Deleted", role.guild.iconURL())
      .addField("Role Name", role)
      .addField("Role ID", role.id)
      .setTimestamp();
    channel.send(embed);
  });
});

client.on("roleUpdate", async (oldRole, newRole) => {
  if (!newRole.guild) return;
  await schema.findOne({ Guild: newRole.guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    const channel = newRole.guild.channels.cache.get(data.Channel);

    if (!channel || channel.available) return;

    if (oldRole.name !== newRole.name) {
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor("ROLE UPDATED - NAME", newRole.guild.iconURL())
        .addField("Old Role", oldRole.name)
        .addField("New Role", newRole.name)
        .setFooter(`Role ID: ${newRole.id}`);

      channel.send(embed);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      const embed = new MessageEmbed()
        .setColor(newRole.hexColor)
        .setAuthor("ROLE UPDATE - COLOR", newRole.guild.iconURL())
        .addField("Old Hex", oldRole.hexColor)
        .addField("New Hex", newRole.hexColor)
        .setFooter(`Role ID: ${newRole.id}`);
      channel.send(embed);
    }
  });
});
