const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicks specified member from the server',
    usage: '<@user | user-id> [reason]',
    timeout: 8000,
    run: async(client, message, args) => {
        try {
            if(!message.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) return message.reply('You do not have the permission \`KICK_MEMBERS\`')
            if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the permission \`KICK_MEMBERS\` ;-;')
            
            let member = message.mentions.members.first()
    
            if (!member) {
                member = await message.guild.members.cache.get(args[0])
            }
    
            if (!member) {
               message.channel.send('Please mention a member to kick')
            }
    
            if(member === message.guild.me) return message.reply('Are you seriously tryna kick me with my own command? You should be ashamed of yourself');
    
            if (member.roles.highest.position > message.member.roles.highest.position) return message.reply(` You cannot kick that member because of role hierarchy issues`);
            
            if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.reply(` I cannot kick that member because of role hierarchy issues`);
    
    
            let kickReason = args.slice(1).join(' ');
    
            if(!kickReason) {
                kickReason = 'No reason specified'
            }
    
            const userSend = new MessageEmbed()
            .setColor('RED')
            .addField('Server', message.guild.name)
            .addField('By', message.author)
            .addField('Action', '**KICK**')
            .addField('Reason', kickReason)
            .setTimestamp()
            try {
                member.send(userSend)
            } catch(err) {
                message.channel.send('Couldn\'t DM the person')
            }
    
            await member.kick({ reason: kickReason })
    
            message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`${member} was kicked by ${message.author} for: \`${kickReason}\``)
            )
    
            client.modlogs ({
                Member: member,
                Color: 'RED',
                Reason: kickReason,
                Action: 'Kick'
            }, message)

        }catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }

    }
}