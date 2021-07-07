const {
    MessageEmbed
} = require('discord.js')
const moment = require('moment')
const emoji = require('../../emoji.json')

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

    run: async (client, message, args) => {
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
            .setTitle(`${emoji.info} **Server Information**`)
            .setColor('BLURPLE')
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField(`${emoji.question} Name of server:`, message.guild.name, true)
            .addField(`${emoji.id} ID of server`, message.guild.id, true)
            .addField(`${emoji.inbox} Created At`, `${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).format('LTS')} ${moment(message.guild.createdTimestamp).fromNow()}`)
            .addField(`${emoji.owner} Owner `, message.guild.owner, true)
            .addField(`${emoji.globe} Region of this server is`, message.guild.region, true)
            .addField(`${emoji.member} No. of Members`, message.guild.members.cache.size, true)
            .addField(`${emoji.slash} No. of Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
            .addField(`${emoji.image} Emojis:`, message.guild.emojis.cache.size, true)
            .addField(`${emoji.message} Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
            .addField(`${emoji.voice} Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
            .addField(`${emoji.mention} Total Amount of Roles:`, message.guild.roles.cache.size, true)
            .addField(`${emoji.success} Verification Level`, `${verificationLevels[message.guild.verificationLevel]}`)
            .addField(`${emoji.link} Vanity Link`, `${vanityInvite}`)
            .addField('Presence', [
                `${emoji.online} Online: ${members.filter(member => member.presence.status === 'online').size}`,
                `${emoji.idle} Idle: ${members.filter(member => member.presence.status === 'idle').size}`,
                `${emoji.dnd} Do Not Disturb: ${members.filter(member => member.presence.status === 'dnd').size}`,
                `${emoji.offline} Offline: ${members.filter(member => member.presence.status === 'offline').size}`,
            ], true)
            .addField(`${emoji.star} Roles [${roles.length}]`, roles.length < 15 ? roles.join(', ') : roles.length > 15 ? `${roles.slice(0, 15).join(', ')}\n+${roles.length-15} roles...` : 'None')
            .setAuthor(`${message.guild.name}`)
        message.channel.send(embed);
    }
}