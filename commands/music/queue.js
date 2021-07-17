const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "queue",
  description: "Gives you the server queue list!",
  usage: "",
  aliases: ["q"],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    let queue = client.distube.getQueue(message);
    if (!queue) {
      const queueError = new MessageEmbed()
        .setDescription(`${emoji.error} There is Nothing Playing`)
        .setColor("RED");
      return message.channel.send(queueError);
    }
    let q = queue.songs
      .map((song, i) => {
        return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
          song.formattedDuration
        }\``;
      })
      .join("\n");

    const embed = new MessageEmbed()
      .setDescription(`${emoji.info} **Server Queue: ** \n\n  ${q}`)
      .setColor("BLUE");

    message.channel.send(embed);
  },
};
