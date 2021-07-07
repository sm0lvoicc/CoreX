const { Client, Message, MessageEmbed, MessageFlags } = require('discord.js');
const schema = require('../../models/anti-spam')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'anti-spam',
    description: 'Enables anti-spam in your server.',
    timeout: 10000,
    usage: '<enable/disable> <Action> <Messages>',
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        options = [
            'enable',
            'disable'
        ]

        if (!args.length) return message.channel.send("Please enter either **enable** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.channel.send('Please enter either **enable** or **disable**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **enable** or **disable**')

        if(opt === 'enable') {
            const action = args[1]
            const messages = parseInt(args[2])
            if(isNaN(messages)) return message.channel.send('Please enter an integer')

            if(!action) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setTitle(`${emoji.error} Please specify an Action.`)
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**'))

            if(!(["warn","mute","kick","ban"]).includes(action.toLowerCase())) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setTitle(`${emoji.error} Please specify a correct Action.`)
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            if(messages <= 2) return message.channel.send('Messages cannot be less than or equal to 2 messages')
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data) data.delete()
                new schema({
                    Guild: message.guild.id,
                    Action: action.toLowerCase(),
                    Messages: messages
                }).save()
            })

            message.channel.send(new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${emoji.error} Anti-Spam has been set to **${messages}** messages and with an Action: **${action}**`)
            )
        }

        if(opt === 'disable') {
            schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.channel.send(`${emoji.error} Anti-Spam module is already disabled`)
                data.delete() 
                message.channel.send(`${emoji.success} Anti-Spam module has been disabled`)
            })
        }
    }
}