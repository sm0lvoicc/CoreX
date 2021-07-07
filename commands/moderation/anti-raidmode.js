const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/raidmode')
const emoji = require(`../../emoji.json`)

module.exports = {
    name: 'anti-raidmode',
    description: 'Enables anti-raidmode and won\'t allow new members to join.',
    timeout: 5000,
    usage: 'enable/disable',
    aliases: ['anti-raid'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['KICK_MEMBERS'],
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
        if (!opt) return message.reply('Please enter either **enable** or **disable**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **enable** or **disable**')

        if(opt === 'enable') {
                schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(!data) {
                        data = new schema({
                            Guild: message.guild.id,
                        })
                        data.save()
                        message.channel.send(`${emoji.success} Anti-raidmode is enabled`)
                    } else{
                        message.channel.send(`${emoji.error} Anti-raidmode is already enabled`)
                    }
                })
            
        }

        if(opt === 'disable') {
            schema.findOne({ Guild: message.guild.id}, async(err,data) =>{
            if(!data) return message.channel.send(`${emoji.error} Anti-raidmode has already been disabled`)
            data.delete()
            message.channel.send(`${emoji.success} Anti-raidmode has been disabled`)
            
            })
            
        }
    }
}