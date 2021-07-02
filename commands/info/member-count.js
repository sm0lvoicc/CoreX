const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'member-count',
    description: 'Shows the member count of the server.',
    timeout: 1000,
    usage: '',
    aliases: ['member-c'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setDescription(`<:corexmembers:860568826046840862> Human Count: ${message.guild.members.cache.filter(u => !u.user.bot).size}\n\n<:corexbot:860569029029658684> Bots Count: ${message.guild.members.cache.filter(u => u.user.bot).size}\n\n<:corexglobe:860568508566994964> Total Members: ${message.guild.memberCount}\n\n`)
        .setColor("GREEN")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    message.channel.send(embed)
    }
}