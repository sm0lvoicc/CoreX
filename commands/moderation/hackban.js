const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hackban',
    description: 'Globally ban a user from your server.',
    timeout: 5000,
    usage: '<user.id> <reason>',
    aliases: ['globalban'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have the permission \`BAN_MEMBERS\`')
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have the permission \`BAN_MEMBERS\`')

        let userID = args[0]
        let reason = args.slice(1).join(' ') || 'No reason specified.'

        if(!userID) return message.reply('Please specify a user ID to ban.')
        if(isNaN(userID)) return message.reply('The user ID must be a number.')

        if(userID === message.author.id) return message.reply('You cannot ban yourself ;-;')
        if(userID == client.user.id) return message.reply('This is not cool, you cannot ban me with my own command.')

        client.users.fetch(userID).then(async(user) => {
            await message.guild.members.ban(user.id, {reason: reason})
            const bannedEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`<:corexyes:860561725916053514> <@${user.id}> was banned by ${message.author} for: \`${reason}\``)
            message.channel.send(bannedEmbed)

            client.modlogs ({
                Member: user,
                Color: 'RED',
                Reason: reason,
                Action: 'Hack Ban'
            }, message)
            
        }).catch(err => {
            return message.reply(`There has been an error, **${err}**`)
        }) 
        
        
    }
}