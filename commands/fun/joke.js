const giveMeAJoke = require("give-me-a-joke");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "joke",
  timeout: 1000 * 5,
  description: "Sends you a random joke.",
  aliases: ["jokes"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    giveMeAJoke.getRandomDadJoke(function (joke) {
      message.channel.send(
        new MessageEmbed().setColor("BLURPLE").setDescription(joke),
      );
    });
  },
};
