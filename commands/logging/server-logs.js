const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/logs-server')

module.exports = {
    name: 'server-logs',
    description: 'Sets/disables server logging.',
    timeout: 5000,
    usage: '<set/disable>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        options = [
            'set',
            'disable'
        ]

        if (!args.length) return message.reply("Please enter either **set** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please enter either **set** or **disable**')


        if (!options.includes(opt)) return message.reply('Please enter either **set** or **disable**')

        if(opt === 'set') {
            const channel = await message.mentions.channels.first()
            if(!channel) return message.reply('Please mention a channel to set as the server logs')

            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(!data) {
                    newData = new schema({
                        Guild: message.guild.id,
                        Channel: channel.id
                    })
                    newData.save()
                    message.channel.send(`<:corexyes:860561725916053514> Server-logs is set to => ${channel}`)
                } else{
                    if(data) {
                        data.delete()
                        new schema({
                            Guild: message.guild.id,
                            Channel: channel.id
                        })
                        data.save()
                        message.channel.send(`<:corexyes:860561725916053514> Server-logs is updated to => ${channel}`)
                }
            }
        })
    }

    if(opt === 'disable') {
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) message.reply('<:corexerror:860580531825147994> The Server-logs is already disabled')
            data.delete()
            message.reply('<:corexyes:860561725916053514> Server logging has been disabled')
        })
    }

    }
}