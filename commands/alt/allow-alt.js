const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'allow-alt',
    description: 'Whitelist users from the Anti-Alt detector',
    timeout: 5000,
    usage: '<user_id>',
    aliases: ['allowalts'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        
        await client.users.fetch(args[0]).then(u => {
            if(!args[0]) return message.reply('Please provide a user ID to add to the Alt whitelist')
            if(isNaN(args[0])) return message.reply('The user ID must be a number')

            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.reply('The Anti-Alt module is disabled')

                let allowedAlts = data.Allowed_Alts
                if(allowedAlts.length === 10) return message.reply('The maximum amount of allowed alts is 10')

                allowedAlts.push(u.id)

                data.updateOne({
                    Allowed_Alts: allowedAlts
                })

                message.reply(`White-listed <@${args[0]}>`)
                
            })
        })
    }
}