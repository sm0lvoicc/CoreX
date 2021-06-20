const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');

module.exports = {
    name: 'bot-info',
    aliases: ["bot", "info", "stats"],
    description: 'Gives the information of the bot',
    usage: '',
    timeout: 1000,
    run: async (client, message, args) => {

        let usersCount = 0;
        for (const guild of client.guilds.cache) {
        usersCount += (await guild[1].members.fetch()).size
        }

        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
        return Duration.replace("0 Day\n", "").replace("0 Hour\n", "").replace("0 Minute\n", "");
        }


        let Uptime = await RemoveUseless(`${Days}${Days > 1 ? "d" : "d"} ${Hours}${Hours > 1 ? "h" : "h"} ${Minutes}${Minutes > 1 ? "m" : "m"} ${Seconds}${Seconds > 1 ? "s" : "s"}`);
    
        const p = await client.prefix(message)

        const embed = new MessageEmbed()
        
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setTitle(`Information`)
        .addField(`✅ Name | ID`, `\`\`\`${client.user.tag} | ${client.user.id}\`\`\``, true)
        .addField(`🌐 Used By`, `\`\`\`${client.guilds.cache.size} Servers\`\`\``, true)
        .addField(`👤 User Count`, `\`\`\`${usersCount} Users\`\`\``, true)
        .addField(`💬 Channel Count`, `\`\`\`${client.channels.cache.size} Channels\`\`\``, true)
        .addField(`👨‍💻 Made With`, `\`\`\`Discord.js & Node.js\`\`\``, true)
        .addField(`🕒 Creation Date`, `\`\`\`${moment.utc(client.user.createdAt).format('DD/MMM/YYYY')}\`\`\``, true)
        .addField(`🏓 Bot Ping`, `\`\`\`Latency: ${Date.now()-message.createdTimestamp} ms\nAPI Latency: ${Math.round(client.ws.ping)} ms\`\`\``, true)
        .addField(`💾 Command Size`, `\`\`\`${client.commands.size} Commands\`\`\``, true)
        .addField(`❗ Prefix`, `\`\`\`${p}\`\`\``, true)
        .addField(`🦺 Developers`, `\`\`\`Tagliatelle#2576 | Novà#1039\`\`\``, true)
        .addField(`📈 Uptime`, `\`\`\`${Uptime}\`\`\``, true)
        .addField(`🔗 Links`, `[Add Me](dsc.gg/corex) | [Join Server](https://discord.gg/VuzcK4Fa6K) | [Vote](https://top.gg/bot/819643325177921587/vote)`)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)
    }
}