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
        .setTitle(`<:corexinfo:860565886111580172> Information`)
        .addField(`<:corexbot:860569029029658684> Name | ID`, `\`\`\`${client.user.tag} | ${client.user.id}\`\`\``, true)
        .addField(`<:corexglobe:861492964617879583> Used By`, `\`\`\`${client.guilds.cache.size} Servers\`\`\``, true)
        .addField(`<:corexmembers:860568826046840862> User Count`, `\`\`\`${usersCount} Users\`\`\``, true)
        .addField(`<:corexchat:860569658657865728> Channel Count`, `\`\`\`${client.channels.cache.size} Channels\`\`\``, true)
        .addField(`<:corexjs:860583073157480498> Made With`, `\`\`\`Discord.js & Node.js\`\`\``, true)
        .addField(`<:corexslash:860562666422534184> Creation Date`, `\`\`\`${moment.utc(client.user.createdAt).format('DD/MMM/YYYY')}\`\`\``, true)
        .addField(`<:corexrocket:860566875174731776> Bot Ping`, `\`\`\`Latency: ${Date.now()-message.createdTimestamp} ms\nAPI Latency: ${Math.round(client.ws.ping)} ms\`\`\``, true)
        .addField(`<:corexinbox:860563596818513920> Command Size`, `\`\`\`${client.commands.size} Commands\`\`\``, true)
        .addField(`<:corexsupport:860567555114270740> Prefix`, `\`\`\`${p}\`\`\``, true)
        .addField(`<:corexowner:860567875378085888> Developers`, `\`\`\`Tagliatelle#2576 | Novà#1039\`\`\``, true)
        .addField(`<:corexonline:860558476605259786> Uptime`, `\`\`\`${Uptime}\`\`\``, true)
        .addField(`<:corexlink:860584013189742612> Links`, `[Add Me](https://dsc.gg/corex) | [Join Server](https://discord.gg/VuzcK4Fa6K) | [Vote](https://top.gg/bot/819643325177921587/vote)`)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)
    }
}