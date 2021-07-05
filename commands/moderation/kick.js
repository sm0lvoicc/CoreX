const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicks specified member from the server',
    usage: '<@user | user-id> [reason]',
    timeout: 8000,
    userPerms: ['KICK_MEMBERS'],
    clientPerms: ['KICK_MEMBERS'],
    run: async(client, message, args) => {
        try {            
            let member = message.mentions.members.first()
    
            if (!member) {
                member = await message.guild.members.cache.get(args[0])
            }
    
            if (!member) {
               message.channel.send('Please mention a member to kick')
            }
    
            if(member === message.guild.me) return message.channel.send('Are you seriously tryna kick me with my own command? You should be ashamed of yourself');
    
            if (message.member.roles.highest.position < member.roles.highest.permission) return message.channel.send('The target has a higher position than you.');
            if (message.guild.me.roles.highest.position < member.roles.highest.permission) return message.channel.send('The target has a higher position than me.');
    
    
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
            .setDescription(`<:corexyes:860561725916053514> ${member} was kicked by ${message.author} for: \`${kickReason}\``)
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