const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'member-count',
    description: 'Shows the member count of the server.',
    timeout: 1000,
    usage: '',
    aliases: ['member-c'],
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],

    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setDescription(`${emoji.member} Human Count: ${message.guild.members.cache.filter(u => !u.user.bot).size}\n\n${emoji.slash} Bots Count: ${message.guild.members.cache.filter(u => u.user.bot).size}\n\n${emoji.globe} Total Members: ${message.guild.memberCount}\n\n`)
        .setColor("GREEN")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    message.channel.send(embed)
    }
}