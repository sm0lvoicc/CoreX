const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const emoji = require("../../emoji.json");

module.exports = {
  name: "cat-fact",
  description: "Sends you a random fact about cats",
  usage: "",
  timeout: 1000,
  aliases: ["catfact"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fact = await fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then(({ fact }) => fact);

    return message.channel.send(`${emoji.search} **Catfact:** *${fact}*`);
  },
};
