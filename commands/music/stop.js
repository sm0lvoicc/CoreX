const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "stop",
  description: "Stops the Music & clears the queue",
  usage: "",
  aliases: [],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["CONNECT"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const stopError = new MessageEmbed()
        .setDescription(
          `${emoji.error} You Need to be in a Voice Channel to stop Music!`,
        )
        .setColor("RED");
      return message.channel.send(stopError);
    }
    if (!client.distube.isPlaying(message)) {
      const stopError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(stopError2);
    }
    client.distube.stop(message);
    const embed = new MessageEmbed()
      .setDescription(`${emoji.success} Stopped!`)
      .setColor("BLUE");
    message.channel.send(embed);
  },
};
