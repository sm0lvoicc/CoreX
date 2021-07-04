const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/leave-channels')

module.exports = {
    name: 'disable-leave',
    description: 'Disables the leave channel.',
    timeout: 6000,
    usage: '',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_GUILD\`')

        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.reply('<:corexerror:860580531825147994> The leave channel is already disabled')
            data.delete()
            message.reply('<:corexyes:860561725916053514> The leave channel has been disabled')
        })
    }
}