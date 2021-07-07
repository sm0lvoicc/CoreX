const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "ping",
  aliases : ['ms', 'latency'],
  timeout: 1000,
  description: "Shows bot's ping.",
  usage: 'ping',
  userPerms: ['SEND_MESSAGES'],
  clientPerms: ['SEND_MESSAGES'],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    var ping = Math.round(client.ws.ping)
    var apiPing = Date.now() - message.createdTimestamp;

        const embedPing = new MessageEmbed() 
        .setColor('RANDOM')
        .setDescription(`${emoji.loading} Latency: **${ping}**ms \nAPI Latency: **${apiping}**ms`);

        message.channel.send(embedPing);
    }
}
