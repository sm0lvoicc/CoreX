const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/mutes')


module.exports = {
    name: 'unmute',
    description: 'Unmutes a muted member',
    timeout: 8000,
    usage: '<@member || member.id> [reason]',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const prefix = client.prefix(message)

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_ROLES\`')
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the permission \`MANAGE_ROLES\`')

            let member = message.mentions.members.first() 
            if(!member) {
                member = message.guild.members.cache.get(args[0])
            }
            if(!member) return message.reply('Please mention a member to unmute')

            const reason = args.slice(1).join(" ") || "No reason specified"
     
            if(member.user.id === message.author.id) return message.channel.send(`You cannot unmute yourself`);
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                message.channel.send(new MessageEmbed().setTitle(`Error`).setColor("RED").setDescription(`No Mute Role set. Set it using \`${prefix}set-muterole <@Role>\``))
            } else {
                const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
                if(!roleD) {
                    message.channel.send(new MessageEmbed().setTitle(`Error`).setColor("RED").setDescription(`The Mute Role is deleted. Set it again using \`${prefix}set-muterole <@Role>\``))
                    return data.delete()
                }
                if(!member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
            .setDescription(`${member.user.username} was unmuted already. So I cannot unmute them again`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
        )
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cannot unmute a user that is higher/equal than you')
        
        if(roleD.deleteable) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} I can't remove the muted role manually**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
        )
        )
        await member.roles.remove(roleD.id)
        message.channel.send(new MessageEmbed().setDescription(`**${member}** was unmuted by **${message.author.tag}** with reason \`${reason}\``).setColor("GREEN"))
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
    }
}