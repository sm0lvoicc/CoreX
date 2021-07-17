const { MessageEmbed, MessageManager } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "pause",
  description: "Pause Music",
  usage: "",
  aliases: [],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const pauseError = new MessageEmbed()
        .setDescription("You Need to be in a Voice Channel to pause Music!")
        .setColor("RED");
      return message.channel.send(pauseError);
    }
    if (!client.distube.isPlaying(message)) {
      const pauseError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(pauseError2);
    }
    if (client.distube.isPaused(message)) {
      const pauseError3 = new MessageEmbed()
        .setDescription(`${emoji.error} The Music is Already Paused!`)
        .setColor("RED");
      return message.channel.send(pauseError3);
    }

    client.distube.pause(message);
    const embed = new MessageEmbed()
      .setDescription(`${emoji.success} Paused!`)
      .setColor("BLUE");
    message.channel.send(embed);
  },
};
