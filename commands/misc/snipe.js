const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'snipe',
    description: 'Snipes a deleted message.',
    timeout: 7000,
    usage: '<No. of snipe/5>',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`')
        
        const snipes = client.snipes.get(message.channel.id)
        if(!snipes) return message.reply('There are no messages deleted ;-;')

        const snipe = +args[0] - 1 || 0
        const target = snipes[snipe]

        if(!target) return message.channel.send(`There is only \`${snipes.length}\` messages deleted`)

        const { msg, time, image} = target;

        message.channel.send(
            new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setImage(image)
            .setDescription(msg.content)
            .setFooter(`${moment(time).fromNow()} | ${snipes + 1}/${snipes.length}`)
        )
    }
}