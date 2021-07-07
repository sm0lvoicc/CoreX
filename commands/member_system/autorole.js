const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/autorole')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'autorole',
    description: 'Enable/Disable AutoRole',
    timeout: 3000,
    usage: '<enable> <@role> || <disable>',
    aliases: ['auto-role'],
    userPerms: ['MANAGE_ROLES'],
    clientPerms: ['MANAGE_ROLES'],
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

        if(opt == 'enable') {
            const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send(`Please mention a role to set as the autorole`)
        
        if(role.position >= message.guild.me.roles.highest.position) return message.channel.send(`${emoji.error} I cannot add a role due to role heirarchy issues`)
        
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                data.delete()
                const newData = new schema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                newData.save()
                const embed2 = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${emoji.success} Auto-role has been updated to ${role}`)
                .setTimestamp()
                message.channel.send(embed2)

            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                await data.save()
                const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${emoji.success} Auto-role has been set to ${role}`)
                .setTimestamp()
                message.channel.send(embed)
            }
        })
        }

        if(opt == 'disable') {
            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(err) throw err
                if(!data) {
                    message.channel.send(`<:corexerror:860580531825147994> The Auto Role module has been disabled already`)
                } else {
                    await schema.findOneAndDelete({ Guild: message.guild.id })
                    message.channel.send(`<:corexyes:860561725916053514> The Auto Role Module has been disabled`)
                }
            })
        }
    }
}