const Discord = require("discord.js")

module.exports = {
    name: 'floppa',
    timeout: 5000, 
    aliases: [''],
    description: 'sends gif of floppa :)',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {
        let Embed = new Discord.MessageEmbed();
          Embed.setTitle(`${emoji.cat} Floppa!`);
          Embed.setImage("https://media.discordapp.net/attachments/813149271805263882/814241246339399710/GIF-201208_072258.gif");
          Embed.setColor(`RANDOM`);
          Embed.setTimestamp()
          Embed.setFooter(`Always Respect Floppa`)
          return message.channel.send(Embed);
    }
}