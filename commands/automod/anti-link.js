const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/anti-link')

module.exports = {
    name: 'anti-link',
    description: 'Enable/Disable Anti-link',
    timeout: 10000,
    usage: '<enable/disable> <Action>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        options = [
            'enable',
            'disable'
        ]

        if (!args.length) return message.reply("Please enter either **enable** or **disable**")
        const opt = args[0].toLowerCase()
        if (!opt) return message.reply('Please enter either **enable** or **disable**')


        if (!options.includes(opt)) return message.reply('Please enter either **enable** or **disable**')

        if(opt == 'enable') {
            const action = args[1]
            if(!action) return message.reply(new MessageEmbed()
            .setColor('RED')
            .setTitle('Please specify an Action.')
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            if(!(["warn","mute", "delete" ,"kick","ban"]).includes(action.toLowerCase())) return message.reply(new MessageEmbed()
            .setColor('RED')
            .setTitle('Please specify a correct action')
            .setDescription('**Kick**, **Ban**, **Delete**, **Warn**, **Mute**')
            )

            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data) data.delete()
                const newData = new schema({
                    Guild: message.guild.id,
                    Action: action
                })
                newData.save()
                message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setTitle('Anti-link set!')
                .setDescription(`Anti-link has been set with Action: **${action}**`))
            })
        }
        if(opt == 'disable') {
            schema.findOne({Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.reply('Anti-link is already disabled')
                data.delete()
                message.reply('Anti-Link has been disabled')
            })
        }
    }
}