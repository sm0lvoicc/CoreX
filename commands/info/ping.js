const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "ping",
  aliases : ['ms', 'latency'],
  timeout: 1000,
  description: "Shows bot's ping.",
  usage: 'ping',
  userPerms: [''],
  clientPerms: [''],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    var ping = Date.now() - message.createdTimestamp;
        const embedPing = new MessageEmbed() 
        .setColor('RANDOM')
        .setDescription(`${emoji.loading} Latency: **${ping}**ms \nAPI Latency: **${Math.round(client.ws.ping)}**ms`);

        message.channel.send(embedPing);
    }
}
