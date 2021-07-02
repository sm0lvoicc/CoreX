const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/ranks')

module.exports = {
    name: 'delrank',
    description: 'Delete a rank from the server',
    timeout: 3000,
    usage: '<rank-name>',
    aliases: ['removerank', 'del-rank'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        const rankName = args.join(' ')
    
        if(!rankName) return message.reply('Please specify a rank name')

        await schema.findOne({ Guild: message.guild.id, Rank: rankName}, async(err, data) => {
            if(!data) {
                message.channel.send('There is no rank with that name')
            } else {
                await schema.findOneAndDelete({ Guild: message.guild.id, Rank: rankName})
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Removed **${rankName}** rank from the server`)
                .setTimestamp()
                )
            }
        })
    }
}