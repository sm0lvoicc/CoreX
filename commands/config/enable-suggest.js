const { MessageEmbed } = require('discord.js');
const schema = require('../../models/suggestions')

module.exports = {
    name : 'enable-suggest',
    aliases: ['e-suggest'],
    timeout: '5000',
    description : 'Enable Suggestion Modules',
    usage: '<#Channel>',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)

        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send("Please mention a channel to set as the suggesstion channel")
        
        schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                })
                message.reply(`The suggestion channel has been set to => <#${data.Channel}>`)
            } else{
                message.reply(`Suggestion Module on this server has been enabled already`)
            }
            data.save()
        })
    }
}