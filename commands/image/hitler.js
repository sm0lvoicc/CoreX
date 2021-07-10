const canvacord = require("canvacord");
const Discord = require("discord.js");

module.exports = {
  name: "hitler",
  timeout: 5000,
  description: "Worse than Hitler.",
  usage: "[@user]",
  aliases: ["worsehitler"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({
      format: "png",
      size: 1024,
      dynamic: true,
    });
    const image = await canvacord.Canvas.hitler(avatar);
    const attachment = new Discord.MessageAttachment(image, "hitler.png");
    const embed = new Discord.MessageEmbed()
      .attachFiles({ attachment: image, name: "hitler.png" })
      .setImage("attachment://hitler.png")
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(embed);
  },
};
