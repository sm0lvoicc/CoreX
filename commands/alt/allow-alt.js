const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/alt");
const emoji = require("../../emoji.json");

module.exports = {
  name: "allow-alt",
  description: "Whitelist users from the Anti-Alt detector",
  timeout: 5000,
  usage: "<user_id>",
  aliases: ["allowalts", "allow-alt", "a-alt", "allow-alts"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await client.users.fetch(args[0]).then((u) => {
      if (!args[0])
        return message.channel.send(
          "Please provide a user ID to add to the Alt whitelist",
        );
      if (isNaN(args[0]))
        return message.channel.send("The user ID must be a number");

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            `${emoji.error} The Anti-Alt module is disabled`,
          );

        let allowedAlts = data.Allowed_Alts;
        if (allowedAlts.length === 10)
          return message.channel.send(
            `${emoji.error} The maximum amount of allowed alts is 10`,
          );

        allowedAlts.push(u.id);

        data.updateOne({
          Allowed_Alts: allowedAlts,
        });

        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${emoji.success} White-listed <@${args[0]}>`)
          .setTimestamp();

        message.channel.send(embed);
      });
    });
  },
};
