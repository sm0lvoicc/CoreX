const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt')

module.exports = {
    name: 'set-days',
    description: 'Set Anti-Alt days',
    timeout: 3000,
    usage: '<days>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINSTRATOR\`')
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the permission \`KICK_MEMBERS\`')
    
        const days = args[0]
        if(!days) return message.reply('Please set the account age needed to join the server.')
        if(isNaN(days)) return message.channel.send(`Days must be a number`)

        await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) {
                new schema({
                    Guild: message.guild.id,
                    Days: days
                })
                message.channel.send(`Set minimum account age to \`${days}\` days`)
            } else {
                data.updateOne({
                    Days: days
                })
                message.channel.send(`Set minimum account age to \`${days}\` days`)
            }
        })
    }
}