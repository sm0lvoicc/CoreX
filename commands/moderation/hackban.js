const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'hackban',
    description: 'Globally ban a user from your server.',
    timeout: 5000,
    usage: '<user.id> <reason>',
    aliases: ['globalban'],
    userPerms: ['BAN_MEMBERS'],
    clientPerms: ['BAN_MEMBERS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let userID = args[0]
        let reason = args.slice(1).join(' ') || 'No reason specified.'

        if(!userID) return message.channel.send('Please specify a user ID to ban.')
        if(isNaN(userID)) return message.channel.send('The user ID must be a number.')

        if(userID === message.author.id) return message.channel.send('You cannot ban yourself ;-;')
        if(userID == client.user.id) return message.channel.send('This is not cool, you cannot ban me with my own command.')

        client.users.fetch(userID).then(async(user) => {
            await message.guild.members.ban(user.id, {reason: reason})
            const bannedEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${emoji.success} <@${user.id}> was banned by ${message.author} for: \`${reason}\``)
            message.channel.send(bannedEmbed)

            client.modlogs ({
                Member: user,
                Color: 'RED',
                Reason: reason,
                Action: 'Hack Ban'
            }, message)
            
        }).catch(err => {
            return message.channel.send(`There has been an error, **${err}**`)
        }) 
        
        
    }
}