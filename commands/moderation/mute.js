const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/mutes')

module.exports = {
    name: 'mute',
    description: 'Mutes mentioned member',
    timeout: 6000,
    usage: '<@member || member.id> [reason]',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const prefix = client.prefix(message)

        if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply(`You do not have the permission \`MANAGE_ROLES\``)
            if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply(`I do not have the permission \`MANAGE_ROLES\``)

            let member = message.mentions.members.first() 
            if(!member) {
                member = message.guild.members.cache.get(args[0])
            }
            if(!member) return message.reply('Please mention a member to mute.')

            const muteReason = args.slice(1).join(" ") || "No reason specified."

            if(member.user.id === message.author.id) return message.reply(`You cannot mute yourself`);
            
            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                message.channel.send(`There seems to be no muted role set, use ${prefix}set-muterole <@role> to set one up!`)
            } else {
                const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
                if(!roleD) {
                    message.channel.send(`The muted role was deleted set it again using ${prefix}set-muterole <@role>`)
                    return data.delete()
                }

                if(member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
            .setDescription(`**${member.user.username} was muted already. So I cannot mute them again**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
        )
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`You cannot mute a user that is higher/equal to your role`)
        
        if(roleD.deleteable) return message.channel.send(new MessageEmbed()
        .setDescription(`**I can't add muted role manually**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
        )
        )

        await member.roles.add(roleD.id)

        message.channel.send(new MessageEmbed()
        .setColor('RED')
        .setDescription(`${member} was muted by ${message.author} for: \`${muteReason}\``)
        .setTimestamp())
        .catch(err => {

        console.log(err)

        message.channel.send(`**An error occured while trying to mute that user**`)
        })

        const dmEmbed = new MessageEmbed()
            .setTitle(`CoreX Moderation`)
            .addField(`Muted User:`, `${member.user.tag} (You)`,true)
            .addField(`Action By:`,message.author.tag,true)
            .addField(`Muted In:`,message.guild.name,true)
            .addField(`Reason:`, muteReason)

            try{
                await member.send(dmEmbed)
            } catch(e) {
              message.channel.send('I could not DM the user! Reason logged.')
              console.log('An error occured while sending the DM embed! ' + e)
            }
            }
        })

        client.modlogs ({
            Member: member,
            Color: 'RED',
            Reason: muteReason,
            Action: 'Mute'
        }, message)
    }
}