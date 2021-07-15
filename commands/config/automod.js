const {
  Client,
  Message,
  MessageEmbed,
  MessageCollector,
} = require("discord.js");
const schema = require("../../models/automod");
const emoji = require("../../emoji.json");
module.exports = {
  name: "automod",
  description: "Setup automod for the server",
  timeout: 3000,
  usage: "",
  aliases: ["auto-mod"],
  userPerms: ["ADMINISTRATOR"],
  clientPerms: ["MANAGE_SERVER"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let antiRaid;
    let antiCurse;
    let antiLink;
    let antiInvite;

    await schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) {
        const newData = schema({
          Guild: message.guild.id,
          Anti_Raid: false,
          Anti_Spam: false,
          Anti_Curse: false,
          Anti_Link: false,
          Anti_Invite: false,
        });
        newData.save();
      }
      if (data.Anti_Raid === "true") {
        antiRaid = `\`[1]\` **Anti-Raid** ${emoji.success}`;
      } else {
        antiRaid = `\`[1]\` **Anti-Raid** ${emoji.error}`;
      }
      if (data.Anti_Spam === "true") {
        antiSpam = `\`[2]\` **Anti-Spam** ${emoji.success}`;
      } else {
        antiSpam = `\`[2]\` **Anti-Spam** ${emoji.error}`;
      }
      if (data.Anti_Curse === "true") {
        antiCurse = `\`[3]\` **Anti-Curse** ${emoji.success}`;
      } else {
        antiCurse = `\`[3]\` **Anti-Curse** ${emoji.error}`;
      }
      if (data.Anti_Link === "true") {
        antiLink = `\`[4]\` **Anti-Link** ${emoji.success}`;
      } else {
        antiLink = `\`[4]\` **Anti-Link** ${emoji.error}`;
      }
      if (data.Anti_Invite === "true") {
        antiInvite = `\`[5]\` **Discord links** ${emoji.success}`;
      } else {
        antiInvite = `\`[5]\` **Discord links** ${emoji.error}`;
      }

      let embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle(`Type a number...`)
        .setDescription(
          `${antiRaid}\n${antiSpam}\n${antiCurse}\n${antiLink}\n${antiInvite}`,
        )
        .setTimestamp();
      message.channel.send(embed);
    });
  },
};
