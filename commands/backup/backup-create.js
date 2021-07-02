const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require('discord-backup')

module.exports = {
    name: 'backup-create',
    description: 'Creates a backup of your server.',
    timeout: 50000,
    usage: '',
    aliases: ['b-create'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I do not have the permission \`ADMINISTRATOR\`')

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