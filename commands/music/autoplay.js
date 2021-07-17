const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "autoplay",
  description: "Toggles Autoplay to ON/OFF",
  usage: "",
  aliases: ["autop"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  timeout: 5000,
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const autoplayError = new MessageEmbed()
        .setDescription("You Need to be in a Voice Channel to toggle autoplay")
        .setColor("RED");
      return message.channel.send(autoplayError);
    }
    if (!client.distube.isPlaying(message)) {
      const autoplayError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(autoplayError2);
    }

    let mode = client.distube.toggleAutoplay(message);
    const embed = new MessageEmbed()
      .setDescription(
        `${emoji.success} Autoplay Mode Set to:\`` +
          (mode ? "On" : "Off") +
          "`",
      )
      .setColor("BLUE");
    message.channel.send(embed);
  },
};
