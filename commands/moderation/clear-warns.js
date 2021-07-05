const db = require('../../models/warns');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear-warns',
    description: 'Clears all the warns from the specified user.',
    timeout: 10000,
    usage: '<@user | user.id>',
    userPerms: ['MANAGE_GUILD'],
    clientPerms: [''],
    run: async(client, message, args) => {        
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
                .setDescription(`<:corexyes:860561725916053514> Cleared all the warns of **${member.user.username}**`)
                .setTimestamp()
                .setColor("GREEN")
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription('<:corexerror:860580531825147994> This user does not have any warns in this server!')
                .setTimestamp()                
                )
            }
        })
    }
}