const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/reaction-roles')

module.exports = {
    name: 'rr-dm',
    description: 'Toggle DM reaction roles',
    timeout: 1000,
    usage: '<true/false>',
    primeOnly: true,
    userPerms: ['ADMINISTRATOR'],
    clientPerms: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        options = [
            'true',
            'false'
        ]

        if (!args.length) return message.channel.send("Please enter either **true** or **false**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.channel.send('Please enter either **true** or **false**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **true** or **false**')

        if(opt == 'false') {
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data.DM == false) return message.channel.send('<:corexerror:860580531825147994> Reaction DMs is already turned off')
                data.DM = false 
                message.channel.send('<:corexyes:860561725916053514> Reaction DMs have been disabled')
            })
        }

        if(opt == 'true') {
            await schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(data.DM == true) return message.channel.send('<:corexerror:860580531825147994> Reaction DMs is already turned on')
                data.DM = true 
                message.channel.send('<:corexyes:860561725916053514> Reaction DMs have been enabled')
            })
        }
    }
}