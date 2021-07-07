const { MessageEmbed } = require('discord.js');
const moment = require('moment')
const emoji = require('../../emoji.json')

const types = {
    dm: 'DM',
    text: '\`Text\`',
    voice: '\`Voice\`',
    news: '\`Announcment\`',
    category: '\`Category\`',
    store: '\`Store\`'
}

module.exports = {
    name: 'channel-info',
    description: 'Shows the information of a specified channel.',
    usage: '[#channel]',
    aliases: ['channelinfo', 'chinfo'],
    timeout: 1000,
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {
        let channel = message.mentions.channels.first() || message.channel;

        const totalUsers = channel.members.size;
        const NFSW = {
            true: 'Yes',
            false: 'No'
        }

        const embed = new MessageEmbed()
        .setTitle(`${emoji.info} Channel Info!!`)
        .addField(`${emoji.channel} Name`, channel, true)
        .addField(`${emoji.id} ID`, `\`${channel.id}\``, true)
        .addField(`${emoji.question} Type`, types[channel.type], true)
        .addField(`${emoji.member} Total Users`, `\`${totalUsers}\``, true)
        .addField(`${emoji.inbox} Creation Date`, `\`${moment(channel.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField(`${emoji.nsfw} NSFW `, `\`${NFSW[channel.nsfw]}\``, true)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)
    }
}