const {
    MessageEmbed
} = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'bot-info',
    aliases: ["bot", "info", "stats"],
    description: 'Gives the information of the bot',
    usage: '',
    timeout: 1000,
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
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

        const dev1 = client.users.cache.get(`538668078012039168`)  //Tagliatelle
        const dev2 = client.users.cache.get(`451202806653648936`) //Nova
        const dev3 = client.users.cache.get(`582012181638414357`) //floppa
        const dev4 = client.users.cache.get(`708635694154776657`) //Jake
        const dev5 = client.users.cache.get(`510166383523528705`) //Shash
        const dev6 = client.users.cache.get(`703975707310555247`) //Lag


        let Uptime = await RemoveUseless(`${Days}${Days > 1 ? "d" : "d"} ${Hours}${Hours > 1 ? "h" : "h"} ${Minutes}${Minutes > 1 ? "m" : "m"} ${Seconds}${Seconds > 1 ? "s" : "s"}`);

        const p = await client.prefix(message)

        const embed = new MessageEmbed()

            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setTitle(`${emoji.info} Information`)
            .addField(`${emoji.mention} Name | ID`, `\`\`\`${client.user.tag} | ${client.user.id}\`\`\``, true)
            .addField(`${emoji.globe} Used By`, `\`\`\`${client.guilds.cache.size} Servers\`\`\``, true)
            .addField(`${emoji.member} User Count`, `\`\`\`${usersCount} Users\`\`\``, true)
            .addField(`${emoji.channel} Channel Count`, `\`\`\`${client.channels.cache.size} Channels\`\`\``, true)
            .addField(`${emoji.js} Made With`, `\`\`\`Discord.js & Node.js\`\`\``, true)
            .addField(`${emoji.slash} Creation Date`, `\`\`\`${moment.utc(client.user.createdAt).format('DD/MMM/YYYY')}\`\`\``, true)
            .addField(`${emoji.settings} Bot Ping`, `\`\`\`Latency: ${Date.now()-message.createdTimestamp} ms\nAPI Latency: ${Math.round(client.ws.ping)} ms\`\`\``, true)
            .addField(`${emoji.inbox} Command Size`, `\`\`\`${client.commands.size} Commands\`\`\``, true)
            .addField(`${emoji.question} Prefix`, `\`\`\`${p}\`\`\``, true)
            .addField(`${emoji.owner} Developers`, `\`\`\`${dev1.tag} | ${dev2.tag} | ${dev3.tag} | ${dev4.tag} | ${dev5.tag} | ${dev6.tag}\`\`\``, true)
            .addField(`${emoji.online} Uptime`, `\`\`\`${Uptime}\`\`\``, true)
            .addField(`${emoji.link} Links`, `[Add Me](https://dsc.gg/corex) | [Join Server](https://discord.gg/VuzcK4Fa6K) | [Vote](https://top.gg/bot/819643325177921587/vote)`)
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp()

        message.channel.send(embed)
    }
}
