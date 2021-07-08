const db = require("../../models/warns");
const { Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "warn",
  description: "Warns the specified user.",
  usage: "<@user | user-id> [reason]",
  timeout: 4000,
  aliases: ["strike"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let user = message.mentions.members.first();

    if (!user) {
      user = await message.guild.members.cache.get(args[0]);
    }

    if (!user) {
      message.channel.send("Please mention a member to warn");
    }

    let warnReason = args.splice(1).join(" ");
    if (!warnReason) {
      warnReason = "No reason specified.";
    }

    if (user === message.member)
      return message.channel.send("You cannot warn yourself");

    if (user === message.guild.me)
      return message.channel.send("You cannot warn me");

    if (user.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${emoji.error} I cannot warn a member with \`ADMINISTRATOR\``,
      );

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

    db.findOne(
      { guildId: message.guild.id, User: user.user.id },
      async (err, data) => {
        if (err) throw err;

        if (!data) {
          data = new db({
            guildId: message.guild.id,
            User: user.user.id,
            content: [
              {
                moderator: message.author.id,
                reason: warnReason,
                ID: random,
              },
            ],
          });
        } else {
          const obj = {
            moderator: message.author.id,
            reason: warnReason,
            ID: random,
          };
          data.content.push(obj);
        }
        data.save();
      },
    );

    message.channel.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `${emoji.success} ${user} was warned by ${message.author} for: \`${warnReason}\``,
        )
        .setFooter(`Warn ID: ${random}`)
        .setTimestamp(),
    );

    const userSend = new MessageEmbed()
      .setTitle("Warn!")
      .setDescription(`You have been warned in **${message.guild}**!`)
      .addField("Moderator", message.member, true)
      .addField("Member", member, true)
      .addField("Reason", warnReason)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({
          dynamic: true,
        }),
      )
      .setTimestamp()
      .setColor("RED");
    try {
      user.send(userSend);
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }

    client.modlogs(
      {
        Member: user,
        Reason: warnReason,
        Color: "RED",
        Action: "Warn",
      },
      message,
    );
  },
};
