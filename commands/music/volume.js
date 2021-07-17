const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "volume",
  description: "Changes Volume of the currently playing Music!",
  usage: "volume <number from 1 to 100>",
  aliases: ["vol"],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const volumeError = new MessageEmbed()
        .setDescription(
          `${emoji.error} You Need to be in a Voice Channel to change Music volume!`,
        )
        .setColor("RED");
      return message.channel.send(volumeError);
    }
    if (!client.distube.isPlaying(message)) {
      const volumeError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(volumeError2);
    }
    let volume = parseInt(args[0]);
    if (isNaN(args[0]) || args[0] > 100) {
      const volumeError3 = new MessageEmbed()
        .setDescription(
          `${emoji.speaker} Please Enter a Valid Number Between 1 and 100`,
        )
        .setColor("RED");
      return message.channel.send(volumeError3);
    }

    client.distube.setVolume(message, volume);
    const embed = new MessageEmbed()
      .setDescription(`${emoji.speaker} Volume has been set to \`${volume}%\``)
      .setColor("BLUE");
    message.channel.send(embed);
  },
};
