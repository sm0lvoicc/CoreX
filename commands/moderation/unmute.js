const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/mutes')


module.exports = {
    name: 'unmute',
    description: 'Unmutes a muted member',
    timeout: 8000,
    usage: '<@member || member.id> [reason]',
    userPerms: ['MANAGE_ROLES'],
    clientPerms: ['MANAGE_ROLES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const prefix = client.prefix(message)    
                let member = message.mentions.members.first() 
                if(!member) {
                    member = message.guild.members.cache.get(args[0])
                }
                if(!member) return message.channel.send('Please mention a member to unmute')
    
                const reason = args.slice(1).join(" ") || "No reason specified"
         
                if(member.user.id === message.author.id) return message.channel.send(`You cannot unmute yourself`);
            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(!data) {
                    message.channel.send(message.channel.send(`<:corexerror:860580531825147994> The muted role was deleted set it again using ${prefix}set-muterole <@role>`))
                } else {
                    const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
                    if(!roleD) {
                        message.channel.send(message.channel.send(`<:corexerror:860580531825147994> The muted role was deleted set it again using ${prefix}set-muterole <@role>`))
                        return data.delete()
                    }
                    if(!member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
                .setDescription(`<:corexerror:860580531825147994> ${member.user.username} was unmuted already. So I cannot unmute them again`)
                .setColor("RED")
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
            )
            if (message.member.roles.highest.position < member.roles.highest.permission) return message.channel.send('The target has a higher position than you.');
            if (message.guild.me.roles.highest.position < member.roles.highest.permission) return message.channel.send('The target has a higher position than me.');
            
            if(roleD.deleteable) return message.channel.send(new MessageEmbed()
            .setDescription(`<:corexerror:860580531825147994> **I can't remove the muted role manually**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            )
            await member.roles.remove(roleD.id)
            message.channel.send(new MessageEmbed().setDescription(`<:corexyes:860561725916053514> **${member}** was unmuted by **${message.author.tag}** with reason \`${reason}\``).setColor("GREEN"))
            .catch(err => {
            console.log(err)
            message.channel.send(`**An error occured while trying to unmute that user**`)
            })
    
            
                }
            })
            client.modlogs ({
                Member: member,
                Color: 'RED',
                Action: 'Unmute',
                Reason: reason
            }, message)

        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}