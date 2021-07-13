const client = require("../index");
const spamSchema = require("../models/anti-spam");
const whitelist = require("../models/whitelist-channel");
const muteSchema = require("../models/mutes");
const warnSchema = require("../models/warns");
const { MessageEmbed } = require("discord.js");
const usersMap = new Map();
const emoji = require("../emoji.json");
client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.member.hasPermission("MANAGE_GUILD")) return;
  //spam
  whitelist.findOne({ Guild: message.guild.id }, async (err, db1) => {
    if (db1) {
      if (db1.Anti_spam.includes(message.channel.id)) return;

      await spamSchema.findOne(
        { Guild: message.guild.id },
        async (err, data) => {
          if (!data) return;
          if (data.Messages <= 2) return data.delete();
          const reason = "Spamming";
          if (usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            let msgCount = userData.msgCount;
            if (parseInt(msgCount) === data.Messages) {
              if (data.Action == "ban") {
                if (message.member.bannable)
                  return message.channel.send(
                    `**[CoreX Auto-Mod] I couldn't ban ${message.member}**`,
                  );
                try {
                  message.member.send(
                    `${emoji.error} You have been banned from **${message.guild.name}**, reason: \`Spamming\``,
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
                if (message.member.kickable)
                  return message.channel.send(
                    `**[CoreX Auto-Mod] I couldn't kick ${message.member}**`,
                  );
                try {
                  message.member.send(
                    `${emoji.error} You have been kicked from **${message.guild.name}**, reason: \`Spamming\``,
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
              } else if (data.Action == "mute") {
                await muteSchema.findOne(
                  { Guild: message.guild.id },
                  async (err, data2) => {
                    if (err) throw err;
                    if (!data2)
                      return message.channel.send(
                        "**[CoreX Auto-Mod] The muted role has not been set**",
                      );
                    const role = await message.guild.roles.cache.get(
                      data2.Role,
                    );
                    if (!role)
                      return message.channel.send(
                        `**[CoreX Auto-Mod] The muted role has been deleted**`,
                      );
                    if (message.member.roles.cache.get(role.id)) return;
                    await message.member.roles.add(
                      role.id,
                      `[CoreX Auto-Mod] -  ${reason}`,
                    );
                    await message.channel
                      .send(`**${message.member}** No spamming`)
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
                await warnSchema.findOne(
                  { guildId: message.guild.id, User: message.member.user.id },
                  async (err, data3) => {
                    if (err) throw err;
                    if (!data3) {
                      data2 = new warnSchema({
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
                      data2.content.push(obj);
                    }
                    data2.save();
                  },
                );
                message.channel
                  .send(
                    `**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``,
                  )
                  .then((msg) => msg.delete({ timeout: 6000 }));
              }
            } else {
              msgCount++;
              userData.msgCount = msgCount;
              usersMap.set(message.author.id, userData);
            }
          } else {
            usersMap.set(message.author.id, {
              msgCount: 1,
              lastMessage: message,
              timer: null,
            });
            setTimeout(() => {
              usersMap.delete(message.author.id);
            }, 5000);
          }
        },
      );
    } else {
      spamSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        if (data.Messages <= 2) return data.delete();
        const reason = "Spamming";
        if (usersMap.has(message.author.id)) {
          const userData = usersMap.get(message.author.id);
          let msgCount = userData.msgCount;
          if (parseInt(msgCount) === data.Messages) {
            if (data.Action == "ban") {
              if (message.member.bannable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't ban ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been banned from **${message.guild.name}**, reason: \`Spamming\``,
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
              if (message.member.kickable)
                return message.channel.send(
                  `**[CoreX Auto-Mod] I couldn't kick ${message.member}**`,
                );
              try {
                message.member.send(
                  `${emoji.error} You have been kicked from **${message.guild.name}**, reason: \`Spamming\``,
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
            } else if (data.Action == "mute") {
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
                    `[CoreX Auto-Mod] -  ${reason}`,
                  );
                  await message.channel
                    .send(`**${message.member}** No spamming`)
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
                },
              );
              message.channel
                .send(
                  `**${message.member}** has been warned for: \`${reason}\`, ID: \`${random}\``,
                )
                .then((msg) => msg.delete({ timeout: 6000 }));
            }
          } else {
            msgCount++;
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
          }
        } else {
          usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: null,
          });
          setTimeout(() => {
            usersMap.delete(message.author.id);
          }, 5000);
        }
      });
    }
  });
});
