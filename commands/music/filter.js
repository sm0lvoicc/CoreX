const { MessageEmbed } = require("discord.js");
const { setFilter } = require("distube");
const emoji = require("../../emoji.json");
module.exports = {
  name: "filter",
  description:
    "Set Music Filter! \n Filter Option: `3d, bassboost, echo, karaoke, nightcore, vaporwave`",
  usage: "<filterOption>",
  aliases: ["setfilter"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  timeout: 5000,
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const filterError = new MessageEmbed()
        .setDescription("You Need to be in a Voice Channel to filter Music!")
        .setColor("RED");
      return message.channel.send(filterError);
    }
    if (!client.distube.isPlaying(message)) {
      const filterError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(filterError2);
    }

    let filterOption = args[0];
    if (!args[0]) {
      const filterOptions = new MessageEmbed()
        .setTitle(`**Filter Options:**`)
        .setDescription(
          `\`3d, bassboost, echo, karaoke, nightcore, vaporwave\``,
        )
        .setColor("BLUE");

      return message.channel.send(filterOptions);
    }

    try {
      await client.distube.setFilter(message, filterOption);
      const embed = new MessageEmbed()
        .setDescription(
          `${emoji.success} Music Filter has been set to: ` +
            `**${filterOption}**` || "Off",
        )
        .setColor("BLUE");

      return message.channel.send(embed);
    } catch (error) {
      return;
    }
  },
};
