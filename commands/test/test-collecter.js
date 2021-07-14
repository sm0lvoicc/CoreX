const {
  Client,
  Message,
  MessageEmbed,
  MessageCollector,
} = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "test",
  description: "",
  timeout: 2000,
  usage: "",
  aliases: [""],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let filter = (m) => m.author.id === message.author.id;
    let Msg = await message.channel.send(
      new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription(
          `\`1\` Anti-spam ${emoji.error}\n\`2\` Anti-link${emoji.error}`,
        ),
    );

    const collector = new MessageCollector(
      message.channel,
      (m) => m.author.id === message.author.id,
      { time: 10000 },
    );
    collector.on("collect", (message) => {
      if (message.content == "1") {
        message.delete();
        message.channel
          .send("Anti-spam on")
          .then((msg) => msg.delete({ timeout: 1000 }));
        Msg.edit(
          new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(
              `\`1\` Anti-spam ${emoji.success}\n\`2\` Anti-link${emoji.error}`,
            ),
        );
      } else if (message.content == "2") {
        message.delete();
        message.channel
          .send("Anti-link on")
          .then((msg) => msg.delete({ timeout: 1000 }));
        Msg.edit(
          new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(
              `\`1\` Anti-spam ${emoji.err}\n\`2\` Anti-link${emoji.success}`,
            ),
        );
      }
    });
  },
};
