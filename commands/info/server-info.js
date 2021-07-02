const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'server-info',
    description: "sends server info",
    timeout: 1000,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {

        const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle("<:corexinfo:860565886111580172> **Server Information**")
        .setColor('BLURPLE')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(`<:corexsupport:860567555114270740> Name of server:`, message.guild.name, true)
        .addField(`<:corexchannel:860560876792840202> ID of server`, message.guild.id, true)
        .addField(`<:corexowner:860567875378085888> Owner of this server is`, message.guild.owner, true)  
        .addField(`<:corexglobe:860568508566994964> Region of this server is`, message.guild.region, true)
        .addField(`<:corexmembers:860568826046840862> No. of Members`, message.guild.members.cache.size, true)
        .addField(`<:corexbot:860569029029658684> No. of Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
        .addField(`<:coreximage:860569337076514836> Emojis:`, message.guild.emojis.cache.size, true)
        .addField(`<:corexchat:860569658657865728> Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField(`<:corexspeak:860569938997805106> Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
        .addField(`<:corexinfo:860565886111580172>Total Amount of Roles:`, message.guild.roles.cache.size, true)
        .setAuthor(`${message.guild.name}`)
        message.channel.send(embed);  
    }
}