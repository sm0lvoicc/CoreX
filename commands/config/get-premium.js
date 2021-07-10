const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const emoji = require("../../emoji.json");

module.exports = {
  name: "get-premium",
  description: "Get instructions on how to obtain premium.",
  timeout: 1000,
  usage: "",
  aliases: ["premiumget", "getpremium"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const getEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${emoji.star} Great choice for picking our premium.`)
      .setDescription(
        `To get premium just simply join the [Support Server](${config.invite}) and then head on over to [Patreon](https://www.patreon.com/corex_dev) and pick the premium tier\nThen just DM the owners that you bought the premium.`,
      )
      .setFooter("Automatic premium system coming soon");
    message.channel.send(getEmbed);
  },
};
