const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "resume",
  description: "Resume Music",
  usage: "",
  aliases: [],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const resumeError = new MessageEmbed()
        .setDescription(
          `${emoji.error} You Need to be in a Voice Channel to resume Music!`,
        )
        .setColor("RED");
      return message.channel.send(resumeError);
    }
    let queue = client.distube.getQueue(message);
    if (!queue) {
      const queueError = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(queueError);
    }
    if (!client.distube.isPaused(message)) {
      const resumeError3 = new MessageEmbed()
        .setDescription(`${emoji.error} The Music is not Paused`)
        .setColor("RED");
      return message.channel.send(resumeError3);
    }

    client.distube.resume(message);
    const embed = new MessageEmbed()
      .setDescription(`${emoji.success} Resumed!`)
      .setColor("BLUE");
    message.channel.send(embed);
  },
};
