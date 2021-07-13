const client = require("../index");
const blacklistWord = require("../models/bad-word");
const { MessageEmbed } = require("discord.js");
const muteSchema = require("../models/mutes");
const warnSchema = require("../models/warns");
const whitelist = require("../models/whitelist-channel");
const emoji = require("../emoji.json");

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.member.hasPermission("MANAGE_GUILD")) return;

  //Anti-curse
  whitelist.findOne({ Guild: message.guild.id }, async (err, db4) => {
    if (db4) {
      if (db4.Anti_curse.includes(message.channel.id)) return;

      const spilittedMsg = message.content.split("");
      const reason = "Cursing";
      let deleting = false;
      blacklistWord.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        data.Words.forEach((c) => {
          if (message.content.toLowerCase().includes(c)) {
            if (data.Action == "ban") {
              if (!message.member.bannable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't ban ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been banned from **${message.guild.name}**, reason: \`Cursing\``,
                );
              } catch (err) {
                throw err;
              }
              message.guild.members.ban(message.member, { reason: reason });
              message.channel
                .send(
                  `**${message.member.user.tag}** has been banned for: \`${reason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "kick") {
              message.delete();
              if (!message.member.kickable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't kick ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been kicked from **${message.guild.name}**, reason: \`Cursing\``,
                );
              } catch (err) {
                throw err;
              }
              message.member.kick(reason);
              message.channel
                .send(
                  `**${message.member.user.tag}** has been kicked for: \`${reason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "delete") {
              message.delete();
              message.channel
                .send(`${message.member} no bad words are allowed`)
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "mute") {
              message.delete();
              muteSchema.findOne(
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
                    `[CoreX Auto-Mod] -  ${reason}`,
                  );
                  message.channel
                    .send(`${message.member} No Bad words allowed`)
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
              message.delete();
              warnSchema.findOne(
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
                          reason: reason,
                          ID: random,
                        },
                      ],
                    });
                  } else {
                    const obj = {
                      moderator: client.user.id,
                      reason: reason,
                      ID: random,
                    };
                    dataWarn.content.push(obj);
                  }
                  dataWarn.save();

                  message.channel
                    .send(
                      `${message.member} has been warned for: \`${reason}\`, ID: \`${random}\``,
                    )
                    .then((msg) => msg.delete({ timeout: 6000 }));
                },
              );
            }
          }
        });
      });
    } else {
      const spilittedMsg = message.content.split("");
      const reason = "Cursing";
      let deleting = false;
      blacklistWord.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        data.Words.forEach((c) => {
          if (message.content.toLowerCase().includes(c)) {
            if (data.Action == "ban") {
              if (!message.member.bannable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't ban ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been banned from **${message.guild.name}**, reason: \`Cursing\``,
                );
              } catch (err) {
                throw err;
              }
              message.guild.members.ban(message.member, { reason: reason });
              message.channel
                .send(
                  `**${message.member.user.tag}** has been banned for: \`${reason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "kick") {
              message.delete();
              if (!message.member.kickable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't kick ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been kicked from **${message.guild.name}**, reason: \`Cursing\``,
                );
              } catch (err) {
                throw err;
              }
              message.member.kick(reason);
              message.channel
                .send(
                  `**${message.member.user.tag}** has been kicked for: \`${reason}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "delete") {
              message.delete();
              message.channel
                .send(`${message.member} no bad words are allowed`)
                .then((msg) => msg.delete({ timeout: 6000 }));
            } else if (data.Action == "mute") {
              message.delete();
              muteSchema.findOne(
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
                    `[CoreX Auto-Mod] -  ${reason}`,
                  );
                  message.channel
                    .send(`${message.member} No Bad words allowed`)
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
              message.delete();
              warnSchema.findOne(
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
                          reason: reason,
                          ID: random,
                        },
                      ],
                    });
                  } else {
                    const obj = {
                      moderator: client.user.id,
                      reason: reason,
                      ID: random,
                    };
                    dataWarn.content.push(obj);
                  }
                  dataWarn.save();

                  message.channel
                    .send(
                      `**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``,
                    )
                    .then((msg) => msg.delete({ timeout: 6000 }));
                },
              );
            }
          }
        });
      });
    }
  });
});
