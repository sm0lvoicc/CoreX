const client = require('../index')
const { MessageEmbed } = require('discord.js');
logChannel = '830136425873801267'

client.on('guildCreate', (guild) => {
    client.channels.cache.get(logChannel).send(
        new MessageEmbed()
        .setTitle('NEW SERVER')
        .addField('SERVER INFO', `${guild.name} (${guild.id}) **${guild.memberCount}** members`)
        .addField('SERVER OWNER', `${guild.owner.tag} (${guild.owner.id})`)
        .setFooter(`I am in ${client.guilds.cache.size} servers`)
        .setColor('GREEN')
    ) 
})

client.on('guildDelete', (guild) => {
    client.channels.cache.get(logChannel).send(
        new MessageEmbed()
        .setTitle('REMOVED FROM SERVER :(')
        .addField('SERVER INFO', `${guild.name} (${guild.id}) **${guild.memberCount}** members`)
        .addField('SERVER OWNER', `${guild.owner.tag} (${guild.owner.id})`)
        .setFooter(`I am in ${client.guilds.cache.size} servers`)
        .setColor('RED')
    ) 
})
