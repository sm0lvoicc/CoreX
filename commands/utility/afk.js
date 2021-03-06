const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const emoji = require(`../../emoji.json`)
module.exports = {
    name: 'afk',
    description: 'Sets you as afk.',
    timeout: 5000,
    usage: '[reason]',
    aliases: ['set-afk'],
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let reason = args.join(' ');
        if(!reason) {
            reason = 'No reason specified.'
        }
        await db.set(`afk-${message.author.id}+${message.guild.id}`, reason)

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${emoji.success} **${message.author.tag}**, You have been set as AFK.\nReason: \`${reason}\``)
        .setTimestamp()
        message.channel.send(embed)
    }
}