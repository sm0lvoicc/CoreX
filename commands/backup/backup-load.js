const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require('discord-backup')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'backup-load',
    description: 'Loads a backup using a backup ID.',
    timeout: 50000,
    usage: '<ID>',
    aliases: ['b-load'],
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['ADMINISTRATOR'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const id = args[0]
        if(!id) return message.channel.send(`${emoji.error} You must provide a Backup ID to load`)
        const msg = await message.channel.send(`${emoji.loading} **Loading Backup...**`)
        try {
        backup.load(id, message.guild)
        }catch(err) {
        msg.delete()
        message.channel.send(`There has been an error, **${error}**`)
        }
    }
}