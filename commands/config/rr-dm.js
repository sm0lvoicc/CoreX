const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/reaction-roles')

module.exports = {
    name: 'rr-dm',
    description: 'Toggle DM reaction roles',
    timeout: 1000,
    usage: '<true/false>',
    aliases: [''],
    primeOnly: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You do not have the permission \`MANAGE_SERVER\``)

        options = [
            'true',
            'false'
        ]

        if (!args.length) return message.reply("Please enter either **true** or **false**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please enter either **true** or **false**')


        if (!options.includes(opt)) return message.reply('Please enter either **true** or **false**')

        if(opt == 'false') {
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data.DM == false) return message.reply('Reaction DMs is already turned off')
                data.DM = false 
                message.channel.send('Reaction DMs have been disabled')
            })
        }

        if(opt == 'true') {
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data.DM == true) return message.reply('Reaction DMs is already turned on')
                data.DM = true 
                message.channel.send('Reaction DMs have been enabled')
            })
        }
    }
}