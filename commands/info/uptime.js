const Discord = require("discord.js");
const Client = new Discord.Client();

module.exports = {
    name: "uptime",
    description: 'Shows the uptime of the bot.',
    timeout: 1000,
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],    
    run: async(Client, message, args) => {
            let days = Math.floor(Client.uptime / 86400000);
    let hours = Math.floor(Client.uptime / 3600000) % 24;
    let minutes = Math.floor(Client.uptime / 60000) % 60;
    let seconds = Math.floor(Client.uptime / 1000) % 60;

    let uptimeE = new Discord.MessageEmbed()
    .setTitle("<:corexrocket:860566875174731776> Uptime")
    .setColor("BLURPLE")
    .setDescription(`\nDay(S) Online: \`${days}\`\n\nHour(S) Online: \`${hours}\`\n\nMinute(S) Online: \`${minutes}\`\n\nSecond(S) Online: \`${seconds}\``)
     .setFooter(`Requested By : ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
    message.channel.send(uptimeE)
    return;
        }
    }
