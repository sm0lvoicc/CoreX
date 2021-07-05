const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/dmjoin')

module.exports = {
    name: 'disable-dmjoin',
    description: 'Disables Dm join.',
    timeout: 9000,
    usage: '',
    aliases: ['d-dmjoin'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_GUILD\`')

        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.channel.send('<:corexerror:860580531825147994> DM join is already disabled.')
            data.delete()
            message.channel.send('<:corexyes:860561725916053514> DM join has been disabled.')
        })
    }
}