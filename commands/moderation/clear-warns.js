const db = require('../../models/warns');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear-warns',
    description: 'Clears all the warns from the specified user.',
    timeout: 10000,
    usage: '<@user | user.id>',
    run: async(client, message, args) => {
        
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`');
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the permission \`MANAGE_MESSAGES\`')
        
        let member = message.mentions.members.first()

        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.reply('Please mention a member')
        }
        
                
        
        db.findOne({ guildId : message.guild.id, user: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                data.delete();
                message.channel.send(new MessageEmbed()
                .setDescription(`Cleared all the warns of **${member.user.username}**`)
                .setTimestamp()
                .setColor("GREEN")
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription('This user does not have any warns in this server!')
                .setTimestamp()                
                )
            }
        })
    }
}