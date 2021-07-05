const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/suggestions')

module.exports = {
    name: 'suggestion',
    description: 'Sets/disables suggestion channel.',
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

        if (!args.length) return message.channel.send("Please enter either **set** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.channel.send('Please enter either **set** or **disable**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **set** or **disable**')

        if(opt === 'set') {
            const channel = await message.mentions.channels.first()
            if(!channel) return message.channel.send('Please mention a channel to set as the Suggestion channel')

            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(!data) {
                    newData = new schema({
                        Guild: message.guild.id,
                        Channel: channel.id
                    })
                    newData.save()
                    message.channel.send(`<:corexyes:860561725916053514> Suggestion channel is set to => ${channel}`)
                } else{
                    if(data) {
                        new schema({
                            Guild: message.guild.id,
                            Channel: channel.id
                        })
                        data.save()
                        message.channel.send(`<:corexyes:860561725916053514> Suggestion channel is updated to => ${channel}`)
                }
            }
        })
    }

    if(opt === 'disable') {
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) message.channel.send('<:corexerror:860580531825147994> The Channel-logs is already disabled')
            data.delete()
            message.channel.send('<:corexyes:860561725916053514> Channel logging has been disabled')
        })
    }

    }
}