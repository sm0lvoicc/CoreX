const db = require("../models/logs");
const client = require("../index");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

client.on("guildMemberAdd", async (member) => {
  db.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;
    const channel = member.guild.channels.cache.get(data.Channel);
    if (!channel || channel.available) return;
    const created = moment(member.user.createdAt).format("DD, MMM Do YYYY");
    const join = moment(member.user.joinedAt).format("DD, MMM Do YYYY");

    const guildMemberAddEmbed = new MessageEmbed()
      .setAuthor("New member", member.guild.iconURL())
      .addField("Member Name", `${member}`)
      .addField("Member ID", member.id)
      .addField("Account created at", created)
      .addField("Joined At", join)
      .addField("Total Member Count", `${member.guild.memberCount} Members`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor("GREEN")
      .setTimestamp(new Date());

    channel.send(guildMemberAddEmbed);
  });
});

client.on("guildMemberRemove", async (member) => {
  db.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;
    const channel = member.guild.channels.cache.get(data.Channel);
    if (!channel || channel.available) return;
    const created = moment(member.user.createdAt).format("DD, MMM Do YYYY");
    const join = moment(member.user.joinedAt).format("DD, MMM Do YYYY");

    const guildMemberRemoveEmbed = new MessageEmbed()
      .setAuthor("Member Left", member.guild.iconURL())
      .addField("Member Name", `${member}`)
      .addField("Member ID", member.id)
      .addField("Account created at", created)
      .addField("Joined At", join)
      .addField("Total Member Count", `${member.guild.memberCount} Members`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor("RED")
      .setTimestamp(new Date());

    channel.send(guildMemberRemoveEmbed);
  });
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  db.findOne({ Guild: newMember.guild.id }, async (err, data) => {
    if (!data) return;
    const channel = newMember.guild.channels.cache.get(data.Channel);
    if (!channel || channel.available) return;

    if (oldMember.nickname != newMember.nickname) {
      if (oldMember.nickname == null) {
        oldMember.nickname = newMember.user.username;
      }

      if (newMember.nickname == null) {
        newMember.nickname = newMember.user.username;
      }

      const nickChangeEmbed = new MessageEmbed()
        .setColor("RED")
        .setAuthor("NICKNAME CHANGED", client.user.displayAvatarURL())
        .setTitle(`Member | ${newMember.user.username}`)
        .setThumbnail(newMember.user.displayAvatarURL({ format: "png" }))
        .addField("Old Nickname", `\`\`\`${oldMember.nickname}\`\`\``)
        .addField("New Nickname", `\`\`\`${newMember.nickname}\`\`\``)
        .setFooter(`Member ID: ${newMember.id}`);

      channel.send(nickChangeEmbed);
    }

    let options = {};

    if (options[newMember.guild.id]) {
      options = options[newMember.guild.id];
    }

    if (typeof options.excludedroles === "undefined")
      options.excludedroles = new Array([]);
    if (typeof options.trackroles === "undefined") options.trackroles = true;
    const oldMemberRoles = oldMember.roles.cache.keyArray();
    const newMemberRoles = newMember.roles.cache.keyArray();
    const oldRoles = oldMemberRoles
      .filter((x) => !options.excludedroles.includes(x))
      .filter((x) => !newMemberRoles.includes(x));
    const newRoles = newMemberRoles
      .filter((x) => !options.excludedroles.includes(x))
      .filter((x) => !oldMemberRoles.includes(x));
    const rolechanged = newRoles.length || oldRoles.length;

    if (rolechanged) {
      let roleadded = "";
      if (newRoles.length > 0) {
        for (let i = 0; i < newRoles.length; i++) {
          if (i > 0) roleadded += ", ";
          roleadded += `<@&${newRoles[i]}>`;
        }
      }
      let roleremoved = "";
      if (oldRoles.length > 0) {
        for (let i = 0; i < oldRoles.length; i++) {
          if (i > 0) roleremoved += ", ";
          roleremoved += `<@&${oldRoles[i]}>`;
        }
      }
      if (roleremoved) {
        const roleRemovedEmbed = new MessageEmbed()
          .setColor("RED")
          .setAuthor("ROLE REMOVED", client.user.displayAvatarURL())
          .addField("Member", newMember)
          .addField("Removed Role", roleremoved)
          .setFooter(`Member ID: ${newMember.id}`);

        channel.send(roleRemovedEmbed);
      }

      if (roleadded) {
        const roleAddedEmbed = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor("ROLE ADDED", client.user.displayAvatarURL())
          .addField("Member", newMember)
          .addField("Added Role", roleadded)
          .setFooter(`Member ID: ${newMember.id}`);

        channel.send(roleAddedEmbed);
      }
    }
  });
});

client.on("guildBanAdd", async (guild, user) => {
  db.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    const channel = guild.channels.cache.get(data.Channel);
    if (!channel || channel.available) return;

    const createdBan = moment(user.createdAt).format("DD, MMM Do YYYY");

    const guildBanAddEmbed = new MessageEmbed()
      .setAuthor("Member Banned", guild.iconURL())
      .addField("Member Name", `<@${user.id}>`)
      .addField("Member ID", user.id)
      .addField("Account created at", createdBan)
      .addField("Total Member Count", `${guild.memberCount} Members`)
      .setColor("RED")
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp(new Date());

    channel.send(guildBanAddEmbed);
  });
});

client.on("guildBanRemove", async (guild, user) => {
  db.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    const channel = guild.channels.cache.get(data.Channel);
    if (!channel || channel.available) return;

    const createdBan = moment(user.createdAt).format("DD, MMM Do YYYY");

    const guildBanRemoveEmbed = new MessageEmbed()
      .setAuthor("Member Unbanned", guild.iconURL())
      .addField("Member Name", `<@${user.id}>`)
      .addField("Member ID", user.id)
      .addField("Account created at", createdBan)
      .addField("Total Member Count", `${guild.memberCount} Members`)
      .setColor("GREEN")
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp(new Date());

    channel.send(guildBanRemoveEmbed);
  });
});
