const fetch = require('node-fetch')
const Discord = require('discord.js')
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dog",
  description: "Generates a dog image",
  timeout: 3000,
  usage: "",
  aliases: ["doggy"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let msg = await message.channel.send("Generating...");

    fetch("https://api.alexflipnote.dev/dogs")
      .then((res) => res.json())
      .then((body) => {
        if (!body) {
          message.channel.send("Could Not Generate Image... Try Again.");
        }

        const cEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Here's A Dog Image! 🐶")
          .setFooter(message.author.tag)
          .setTimestamp()
          .setImage(body.link);

        msg.delete();

        message.channel.send(cEmbed).catch(console.error);
      });
  },
};