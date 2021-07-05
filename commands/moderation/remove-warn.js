const db = require('../../models/warns');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove-warn',
    description: 'Removes specified warn from the user.',
    timeout: 5000,
    usage: '<@user | user.id>',
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['MANAGE_GUILD'],
    run: async(client, message, args) => {        
        let member = message.mentions.members.first()

        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.channel.send('Please mention a member to remove a warn from')
        }
                

        let removeWarnReason = args.slice(1).join(' ');
        if(!removeWarnReason) {
            removeWarnReason = 'No reason Specified'
        }

        db.findOne({ guildId : message.guild.id, user: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`<:corexyes:860561725916053514> Removed warns from ${member.user.tag}`)
                .setTimestamp()                
                )
                data.save()
            } else {
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription('<:corexerror:860580531825147994> This user does not have any warns')
                .setTimestamp()                
                )
            }
        })
        client.modlogs ({
            Member: member,
            Color: 'RED',
            Reason: removeWarnReason,
            Action: 'Removed warn'
        }, message)
    }
}