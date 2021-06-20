const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require('discord-backup')

module.exports = {
    name: 'backup-load',
    description: 'Loads a backup using a backup ID.',
    timeout: 50000,
    usage: '<ID>',
    aliases: ['b-load'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I do not have the permission \`ADMINISTRATOR\`')

        const id = args[0]
        if(!id) return message.reply(`You must provide a Backup ID to load**`)
        const msg = await message.channel.send(`**Loading Backup...**`)
        try {
        backup.load(id, message.guild)
        }catch(err) {
        msg.delete()
        message.channel.send(`An error occured when I'm trying to load backup. Make sure I have enough permissions and the Backup ID is correct`)
        }
    }
}