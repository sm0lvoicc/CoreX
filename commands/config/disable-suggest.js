const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/suggestions')

module.exports = {
    name : 'disable-suggestion',
    aliases: ['dr'],
    timeout: 4000,
    description : 'Disable Suggestion Modules',
    usage: '',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)
        
                await schema.findOneAndDelete({ Guild : message.guild.id })
                message.reply(`Success! The Suggestion Module on this server has been disabled`)
    }
}