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
    // var ping = Math.round(client.ws.ping)
    // var apiPing = Date.now() - message.createdTimestamp;

    //     const embedPing = new MessageEmbed() 
    //     .setColor('BLURPLE')
    //     .setDescription(`${emoji.loading} Latency: **${ping}**ms \nAPI Latency: **${apiPing}**ms`);

    //     message.channel.send(embedPing);
    const roleColor =
    message.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : message.guild.me.displayHexColor;
      
      let circles = {
          green: "🟢",
          yellow: "🟡",
          red: "🔴"
      }
    const msg = await message.channel.send(new MessageEmbed()
      .setColor("RED") //you can change this
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField("Websocket", 
          `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
      ))
    
      let ping = msg.createdTimestamp - message.createdTimestamp;
    
      msg.edit(
          new MessageEmbed()
          .setColor(roleColor)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .addField("Websocket", 
          `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
      )
          .addField("RoundTrip",
          `${ping <= 200 ? circles.green : ping <= 400 ? circles.yellow : circles.red} ${ping} ms `
          )
      )
    }
}
