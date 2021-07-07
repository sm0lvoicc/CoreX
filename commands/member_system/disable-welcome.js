const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/welcome-channels')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'disable-welcome',
    description: 'Disables the welcome channel.',
    timeout: 6000,
    usage: '',
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.channel.send(`${emoji.error} The welcome channel is already disabled`)
            data.delete()
            message.channel.send(`${emoji.success} The welcome channel has been disabled`)
        })
    }
}