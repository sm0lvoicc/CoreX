const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/ranks')

module.exports = {
    name: 'rank',
    description: 'Join a rank in this server',
    timeout: 2000,
    usage: '<rank-name>',
    aliases: ['join-rank'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the permission \`MANAGE_ROLES\`')

            const rankName = args.join(' ')
            if(!rankName) return message.reply('Please specify a rank to join')

            await schema.findOne({ Guild: message.guild.id, Rank: rankName}, async(err, data) => {
                if(!data) {
                    message.channel.send('This rank does not exist')
                } else {
                    const rankRole = message.guild.roles.cache.find(role => role.id === data.Role)
                    if(!rankRole) return message.channel.send('Seems like the rank role has been deleted')
                    if(!message.member.roles.cache.get(rankRole)) {
                        await message.member.roles.add(rankRole)
                        message.channel.send(new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`You have joined the rank **${data.Rank}**`)
                        .setTimestamp()
                        )
                    } else if(message.member.roles.cache.get(rankRole)) {
                        await message.member.roles.remove(rankRole)
                        message.channel.send(new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`You have left the rank **${data.Rank}**`)
                        .setTimestamp()
                        )
                    }
                }
            })  
        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}