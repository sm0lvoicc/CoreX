const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "unban",
  description: "Unbans specified member.",
  usage: "<user-id> [reason]",
  timeout: 9000,
  aliases: ["un-ban"],
  userPerms: ["BAN_MEMBERS"],
  clientPerms: ["BAN_MEMBERS"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns
   */
  run: async (client, message, args) => {
    try {
      const userUnban = args[0];

      let unBanReason = args.slice(1).join(" ");

      if (!unBanReason) {
        unBanReason = "No reason specified";
      }

      if (!userUnban || isNaN(userUnban))
        message.channel.send("Please specify a user id to unban");

      const bannedMembers = await message.guild.fetchBans();

      if (!bannedMembers.find((user) => user.user.id === userUnban))
        return message.channel.send(`${emoji.error} This user is not banned`);

      message.guild.members.unban(userUnban);

      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `${emoji.success} <@${userUnban}> has been successfully unbanned `,
          ),
      );
    } catch (e) {
      message.channel.send(`There has been an error, **${e}**`);
    }
  },
};
