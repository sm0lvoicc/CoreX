const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "loop",
  description: "Loops the Music/ Puts it on repeat!",
  usage: "",
  aliases: ["loops"],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      const loopError = new MessageEmbed()
        .setDescription(
          `${emoji.error} You Need to be in a Voice Channel to loop Music!`,
        )
        .setColor("RED");
      return message.channel.send(loopError);
    }
    if (!client.distube.isPlaying(message)) {
      const loopError2 = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(loopError2);
    }

    let mode = null;

    switch (args[0]) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }

    mode = client.distube.setRepeatMode(message, mode);
    mode = mode ? (mode == 2 ? "Repeat queue" : "Repeat song") : "Off";
    const embed = new MessageEmbed()
      .setDescription(
        `${emoji.success} Loop is now set to: \`${mode}\` \n Use Loop multiple times to switch between loop modes.`,
      )
      .setColor("BLURPLE");
    message.channel.send(embed);
  },
};
