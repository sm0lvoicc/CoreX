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
    run: async(client, message, args) => {
        let channel = message.mentions.channels.first() || message.channel;

        if(!channel) return message.reply('Please provide a channel from this server!');

        const totalUsers = channel.members.size;
        const bots = channel.members.array().filter(b => b.user.bot).length;
        const humans = channel.members.size - bots;
        const NFSW = {
            true: 'Yes',
            false: 'No'
        }

        const embed = new MessageEmbed()
        .setTitle('Channel Info!!')
        .addField('Name', channel, true)
        .addField('ID', `\`${channel.id}\``, true)
        .addField('Type', types[channel.type], true)
        .addField('Total Users', `\`${totalUsers}\``, true)
        .addField('Humans', `\`${humans}\``, true)
        .addField('Bots', `\`${bots}\``, true)
        .addField('Creation Date', `\`${moment(channel.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('NSFW ', `\`${NFSW[channel.nsfw]}\``, true)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)
    }
}