const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'server-info',
    description: "sends server info",
    timeout: 1000,
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        const vanityCode = message.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const members = message.guild.members.cache;
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

        const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle("<:corexinfo:860565886111580172> **Server Information**")
        .setColor('BLURPLE')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(`<:corexsupport:860567555114270740> Name of server:`, message.guild.name, true)
        .addField(`<:corexchannel:860560876792840202> ID of server`, message.guild.id, true)
        .addField(`<:corexinbox:860563596818513920> Created At`, `${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).format('LTS')} ${moment(message.guild.createdTimestamp).fromNow()}`)
        .addField(`<:corexowner:860567875378085888> Owner of this server is`, message.guild.owner, true)  
        .addField(`<:corexglobe:861492964617879583> Region of this server is`, message.guild.region, true)
        .addField(`<:corexmembers:860568826046840862> No. of Members`, message.guild.members.cache.size, true)
        .addField(`<:corexbot:860569029029658684> No. of Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
        .addField(`<:coreximage:860569337076514836> Emojis:`, message.guild.emojis.cache.size, true)
        .addField(`<:corexchat:860569658657865728> Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField(`<:corexspeak:860569938997805106> Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
        .addField(`<:corexinfo:860565886111580172>Total Amount of Roles:`, message.guild.roles.cache.size, true)
        .addField(`<:corexyes:860561725916053514> Verification Level`, `${verificationLevels[message.guild.verificationLevel]}`)
        .addField(`<:corexlink:860584013189742612> Vanity Link`, `${vanityInvite}`)
        .addField('Presence', [
            `<:corexonline:861737336579293215> Online: ${members.filter(member => member.presence.status === 'online').size}`,
            `<:corexidle:861737479992508447> Idle: ${members.filter(member => member.presence.status === 'idle').size}`,
            `<:corexdnd:861737403151286322> Do Not Disturb: ${members.filter(member => member.presence.status === 'dnd').size}`,
            `<:corexoffline:861737516989022218> Offline: ${members.filter(member => member.presence.status === 'offline').size}`,
        ], true)
        .addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(', ') : roles.length > 15 ? `${roles.slice(0, 15).join(', ')}\n+${roles.length-15} roles...` : 'None')
        .setAuthor(`${message.guild.name}`)
        message.channel.send(embed);  
    }
}