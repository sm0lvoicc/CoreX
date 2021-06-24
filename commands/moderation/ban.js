const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a specified member.',
    timeout: 10000,
    usage: '<@user | user.id> [reason]',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have the permission \`BAN_MEMBERS\`')

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I do not have the permission \`BAN_MEMBERS\`')

        let member = message.mentions.members.first()
        let banReason = args[1]

        
        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
           message.channel.send('Please mention a member to ban.')
        }
        
        if (message.member.roles.highest.position < member.roles.highest.position) return message.reply(` You cannot ban that member because of role hierarchy issues`);
        
        if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.reply(` I cannot ban that member because of role hierarchy issues`);



        if (!args[1]) {
            banReason = "No reason specified";
        } else if (args[1]) {
            banReason = args.slice(1).join(" ");
        }

        if (banReason.length > 1024) banReason = banReason.slice(0, 1021) + "...";

        const bannedEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${member} was banned by ${message.author} for: \`${banReason}\``)
        

        const dmEmbed = new MessageEmbed()
            .setTitle("Banned!")
            .setDescription(`You have been banned from **${message.guild}**!`)
            .addField('Moderator', message.member, true)
            .addField('Member', member, true)
            .addField('Reason', banReason)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setColor('RED')
            
            try {
                await member.send(dmEmbed)

                message.channel.send('I have successfully sent the reason to the user!')
            } catch (e) {
                message.channel.send(`There has been an error, **${e}**`)
            }
            
        try {
            await message.guild.members.ban(member.id, {
                reason: banReason
            })

            message.channel.send(bannedEmbed)

        } catch (e) {
            message.channel.send(`There has been an error, **${e}**`)

        }

        client.modlogs ({
            Member: member,
            Color: 'RED',
            Reason: banReason,
            Action: 'Ban'
        }, message)
    } catch(e) {
        message.channel.send(`There has been an error, **${e}**`)
    }
    }
}