const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "skip",
  description: "Skips Music in a Queue",
  usage: "",
  aliases: [],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const skipError = new MessageEmbed()
        .setDescription(
          `${emoji.error} You Need to be in a Voice Channel to skip music!`,
        )
        .setColor("RED");
      return message.channel.send(skipError);
    }
    if (!client.distube.isPlaying(message)) {
      const skipError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(skipError2);
    }

    let queue = client.distube.skip(message);

    const embed = new MessageEmbed()
      .setDescription(`${emoji.success} Skipped!`)
      .setColor("BLUE");

    message.channel.send(embed);
  },
};
