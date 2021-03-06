const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/notes')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'notes',
    description: 'Shows the notes of a user',
    timeout: 7000,
    usage: '<@user | user.id>',
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['MANAGE_GUILD'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let user = message.mentions.members.first()
        if(!user) {
            user = message.guild.members.cache.get(args[0])
        }
        if(!user) return message.channel.send('Please specify a user.')

        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${emoji.settings} All Notes`)
                    .setDescription(
                        data.content.map(
                            (w, i) =>
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator)}\nNotes : \`${w.reason}\`\nNote ID : \`${w.ID}\``
                        )
                    )
                    .setColor(`GREEN`)
                )
            } else {
                message.channel.send(new MessageEmbed()
                    .setDescription(`${emoji.error} **${user.user.tag}** doesn't have any notes.`)
                    .setColor("GREEN")
                )
            }

        })
    }
}