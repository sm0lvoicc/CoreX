const { MessageEmbed } = require("discord.js");

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
        .setDescription(`<:corexrocket:860566875174731776> Latency: **${ping}**ms \nAPI Latency: **${Math.round(client.ws.ping)}**ms`);

        message.channel.send(embedPing);
    }
}
