const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/notes')

module.exports = {
    name: 'clear-notes',
    description: 'Clears notes of a specified user.',
    timeout: 8000,
    usage: '<@user | user.id>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`');

        let user = message.mentions.members.first()
        if(!user) {
            user = message.guild.members.cache.get(args[0])
        }
        if(!user) return message.reply('Please specify a user.')

        if(user.user.id === message.author.id) return message.channel.send('<:corexerror:860580531825147994> You cannot clear your own notes.')

        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(new MessageEmbed()
                    .setDescription(`<:corexyes:860561725916053514> Cleared all the notes of **${user.user.username}**`)
                    .setTimestamp()
                    .setColor("GREEN")
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setDescription(`<:corexerror:860580531825147994> **${user.user.tag}** doesn't have any notes.`)
                .setColor("RED")
                )
            }
        })
    }
}