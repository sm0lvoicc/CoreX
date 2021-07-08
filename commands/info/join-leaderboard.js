const { ReactionPages } = require("reconlx");
const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "join-leaderboard",
  description: "Shows the leaderboard of users-joins",
  timeout: 1000,
  aliases: ["join-lb", "user-join-lb", "lb-join", "lb join"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const members = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);

    const arrayOfMembers = members.array();
    const ids = [];
    arrayOfMembers.forEach((mem) => {
      ids.push(mem.user.id);
    });

    let index = 1;
    if (ids.length > 10) {
      const chunks = convertChunk(ids, 10);
      const arry = [];
      for (chunk of chunks) {
        const description = chunk.map(
          (v) =>
            `#${index++} **${message.guild.members.cache.get(v).user.tag}**`,
        );
        arry.push(
          new MessageEmbed()
            .setTitle("Join Leaderboard in " + message.guild.name)
            .setDescription(description)
            .setColor("RANDOM"),
        );
      }
      ReactionPages(message, arry, true);
    } else {
      const description = ids.map(
        (v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`,
      );
      message.channel.send(
        new MessageEmbed()
          .setTitle(`${emoji.info} Join Leaderboard in ` + message.guild.name)
          .setDescription(description)
          .setColor("RANDOM"),
      );
    }
  },
};

function convertChunk(arr, size) {
  const array = [];
  for (let i = 0; i < arr.length; i += size) {
    array.push(arr.slice(i, i + size));
  }
  return array;
}