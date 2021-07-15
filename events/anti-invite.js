/*
const client = require("../index");
const adSchema = require("../models/anti-ad");
const { MessageEmbed } = require("discord.js");
const muteSchema = require("../models/mutes");
const warnSchema = require("../models/warns");
const whitelist = require("../models/whitelist-channel");
const emoji = require("../emoji.json");

client.on(" message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.member.hasPermission("MANAGE_GUILD")) return;
  const adURL = (str) => {
    var regex =
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/;
    if (!regex.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  whitelist.findOne({ Guild: message.guild.id }, async (err, db3) => {
    if (db3) {
      if (db3.Anti_Invite.includes(message.channel.id)) return;

      if (adURL(message.content)) {
        await adSchema.findOne(
          { Guild: message.guild.id },
          async (err, data) => {
            if (err) throw err;
            if (!data) return;
            const AdReason = "Posting Invite links";
            if (data.Action == "ban") {
              if (!message.member.bannable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't ban ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been banned from **${message.guild.name}**, reason: \`Posting Invite links\``,
                );
              } catch (err) {
                throw err;
              }

              message.guild.members.ban(message.member, { reason: AdReason });
              message.channel
                .send(
                  `**${message.member.user.tag}** has been banned for: \`${AdReason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "kick") {
              await message.delete();
              if (!message.member.kickable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't kick ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been kicked from **${message.guild.name}**, reason: \`Posting Invite links\``,
                );
              } catch (err) {
                throw err;
              }

              message.member.kick(AdReason);
              message.channel
                .send(
                  `**${message.member.user.tag}** has been kicked for: \`${AdReason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "delete") {
              await message.delete();
              await (
                await message.channel.send(
                  `${message.member} No Invite links allowed`,
                )
              ).attachments((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "mute") {
              await message.delete();
              await muteSchema.findOne(
                { Guild: message.guild.id },
                async (err, data2) => {
                  if (err) throw err;
                  if (!data2)
                    return message.channel.send(
                      "**[CoreX Auto-Mod] The muted role has not been set**",
                    );
                  const role = await message.guild.roles.cache.get(data2.Role);
                  if (!role)
                    return message.channel.send(
                      `**[CoreX Auto-Mod] The muted role has been deleted**`,
                    );
                  if (message.member.roles.cache.get(role.id)) return;
                  await message.member.roles.add(
                    role.id,
                    `[CoreX Auto-Mod] -  ${linkReason}`,
                  );
                  await message.channel
                    .send(`**${message.member}** No Invite links allowed`)
                    .then((msg) => msg.delete({ timeout: 6000 }));
                },
              );
            } else if (data.Action == "warn") {
              function generateRandomString(length) {
                var chars =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()";
                var random_string = "";
                if (length > 0) {
                  for (var i = 0; i < length; i++) {
                    random_string += chars.charAt(
                      Math.floor(Math.random() * chars.length),
                    );
                  }
                }
                return random_string;
              }
              const random = generateRandomString(10);
              await message.delete();
              await warnSchema.findOne(
                { guildId: message.guild.id, User: message.member.user.id },
                async (err, data3) => {
                  if (err) throw err;
                  if (!data3) {
                    dataWarn = new warnSchema({
                      guildId: message.guild.id,
                      User: message.member.user.id,

                      content: [
                        {
                          moderator: client.user.id,
                          reason: AdReason,
                          ID: random,
                        },
                      ],
                    });
                  } else {
                    const obj = {
                      moderator: client.user.id,
                      reason: AdReason,
                      ID: random,
                    };
                    dataWarn.content.push(obj);
                  }
                  dataWarn.save();

                  message.channel
                    .send(
                      `**${message.member}** has been warned for: \`${AdReason}\`, ID: \`${random}\``,
                    )
                    .then((msg) => msg.delete({ timeout: 6000 }));
                },
              );
            }
          },
        );
      }
    } else {
      if (adURL(message.content)) {
        await adSchema.findOne(
          { Guild: message.guild.id },
          async (err, data) => {
            if (err) throw err;
            if (!data) return;
            const AdReason = "Posting Invite links";
            if (data.Action == "ban") {
              if (!message.member.bannable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't ban ${message.member}**`,
                );

              try {
                message.member.send(
                  `${emoji.error} You have been banned from **${message.guild.name}**, reason: \`Posting Invite links\``,
                );
              } catch (err) {
                throw err;
              }
              message.guild.members.ban(message.member, { reason: AdReason });
              message.channel
                .send(
                  `**${message.member.user.tag}** has been banned for: \`${AdReason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "kick") {
              await message.delete();
              if (!message.member.kickable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't kick ${message.member}**`,
                );

              try {
                message.member.send(
                  `${emoji.error} You have been kicked from **${message.guild.name}**, reason: \`Posting Invite links\``,
                );
              } catch (err) {
                throw err;
              }
              message.member.kick(AdReason);
              message.channel
                .send(
                  `**${message.member.user.tag}** has been kicked for: \`${AdReason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "delete") {
              await message.delete();
              await message.channel
                .send(`${message.member} No Invite links allowed`)
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "mute") {
              await message.delete();
              await muteSchema.findOne(
                { Guild: message.guild.id },
                async (err, data2) => {
                  if (err) throw err;
                  if (!data2)
                    return message.channel.send(
                      "**[CoreX Auto-Mod] The muted role has not been set**",
                    );
                  const role = await message.guild.roles.cache.get(data2.Role);
                  if (!role)
                    return message.channel.send(
                      `**[CoreX Auto-Mod] The muted role has been deleted**`,
                    );
                  if (message.member.roles.cache.get(role.id)) return;
                  await message.member.roles.add(
                    role.id,
                    `[CoreX Auto-Mod] -  ${AdReason}`,
                  );
                  await message.channel
                    .send(`**${message.member}** No Invite links allowed`)
                    .then((msg) => msg.delete({ timeout: 6000 }));
                },
              );
            } else if (data.Action == "warn") {
              function generateRandomString(length) {
                var chars =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()";
                var random_string = "";
                if (length > 0) {
                  for (var i = 0; i < length; i++) {
                    random_string += chars.charAt(
                      Math.floor(Math.random() * chars.length),
                    );
                  }
                }
                return random_string;
              }
              const random = generateRandomString(10);
              await message.delete();
              await warnSchema.findOne(
                { guildId: message.guild.id, User: message.member.user.id },
                async (err, data3) => {
                  if (err) throw err;
                  if (!data3) {
                    dataWarn = new warnSchema({
                      guildId: message.guild.id,
                      User: message.member.user.id,

                      content: [
                        {
                          moderator: client.user.id,
                          reason: AdReason,
                          ID: random,
                        },
                      ],
                    });
                  } else {
                    const obj = {
                      moderator: client.user.id,
                      reason: AdReason,
                      ID: random,
                    };
                    dataWarn.content.push(obj);
                  }
                  dataWarn.save();

                  message.channel
                    .send(
                      `**${message.member}** has been warned for: \`${AdReason}\`, ID: \`${random}\``,
                    )
                    .then((msg) => msg.delete({ timeout: 6000 }));
                },
              );
            }
          },
        );
      }
    }
  });
});
*/
