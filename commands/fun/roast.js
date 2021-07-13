const roast = require("roastme");
const Discord = require("discord.js");
const config = require("../../config.json");
const embed = new Discord.MessageEmbed();

module.exports = {
  name: "roast",
  description: "Roasts another user!",
  usage: "",
  timeout: 1000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    try {
      if (!message.content.startsWith(config.prefix)) return;
      const embed222 = new Discord.MessageEmbed(); // bot perm check send
      if (
        !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
      ) {
        embed222.setDescription("I am missing the `SEND_MESSAGES` permission.");
        embed222.setColor("RANDOM");
        message.author.send(embed222);
        return;
      } else {
        const x = roast.random();
        const member =
          (await message.mentions.members.first()) ||
          message.guild.members.cache.get(args.slice(1).join(" ")) ||
          message.guild.members.cache.find(
            (m) => m.displayName === args.slice(1).join(" "),
          ) ||
          message.guild.members.cache.find(
            (member) => member.user.username === args.slice(1).join(" "),
          ) ||
          message.guild.members.cache.find(
            (member) => member.user.tag === args.slice(1).join(" "),
          ) ||
          message.member;
        if (member.id === "819643325177921587") {
          const yomamaa12 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(
              `🔥 Did you really think I was going to roast myself?`,
            );
          message.channel.send(yomamaa12);
          return;
        }

        let msg = await message.channel.send("Generating...");

        if (!x) {
          message.channel.send("Could Not Get Roast... Try Again.");
        }

        const yomamaa112 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`${member}, 🔥 ${x}`);
        msg.delete();
        message.channel.send(yomamaa112);
      }
    } catch (err) {
      catchErr(err);
    }
  },
};
