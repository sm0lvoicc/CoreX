const { MessageEmbed } = require('discord.js');
const moment = require('moment')

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
    userPerms: [''],
    clientPerms: [''],
    run: async(client, message, args) => {
        let channel = message.mentions.channels.first() || message.channel;

        const totalUsers = channel.members.size;
        const NFSW = {
            true: 'Yes',
            false: 'No'
        }

        const embed = new MessageEmbed()
        .setTitle('<:corexinfo:860565886111580172> Channel Info!!')
        .addField('<:corexchat:860569658657865728> Name', channel, true)
        .addField('<:corexchannel:860560876792840202> ID', `\`${channel.id}\``, true)
        .addField('<:corexfilter:860582132702904320> Type', types[channel.type], true)
        .addField('<:corexmembers:860568826046840862> Total Users', `\`${totalUsers}\``, true)
        .addField('<:corexinbox:860563596818513920> Creation Date', `\`${moment(channel.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('<:corexnsfw:860582526556045332> NSFW ', `\`${NFSW[channel.nsfw]}\``, true)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)
    }
}