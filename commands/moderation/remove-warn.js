const db = require('../../models/warns');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove-warn',
    description: 'Removes specified warn from the user.',
    timeout: 5000,
    usage: '<@user | user.id>',
    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`');
        
        let member = message.mentions.members.first()

        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.reply('Please mention a member to remove a warn from')
        }
                

        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the permission \`MANAGE_MESSAGES\`')

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
                .setDescription(`Removed warns from ${member.user.tag}`)
                .setTimestamp()                
                )
                data.save()
            } else {
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setDescription('This user is squeaky clean!')
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