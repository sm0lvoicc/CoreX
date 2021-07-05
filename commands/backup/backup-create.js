const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require('discord-backup')

module.exports = {
    name: 'backup-create',
    description: 'Creates a backup of your server.',
    timeout: 50000,
    usage: '',
    aliases: ['b-create'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['ADMINISTRATOR'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const msg = await message.channel.send(`<a:corexloading:860601769675456513> **Creating Backup...**`)
        try {
        backup
            .create(message.guild, {
                maxMessagesPerChannel: 0,
                jsonSave: true,
                jsonBeautify: true,
            }).then(b => {
                msg.delete()
                message.channel.send(new MessageEmbed()
                .setDescription(`<:corexyes:860561725916053514> Backup Created: \`${b.id}\`. Make sure to remember this code`)
                .setColor("GREEN"))
            })
        }catch(err) {
        msg.delete()
        message.channel.send(`There has been an error. **${error}**`)
        }
    }
}