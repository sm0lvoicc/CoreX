const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    timeout: 1000, 
    description: 'Announces something in specified channel',
    usage: '<channel> <message> ',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command');

        let mention;

        if(!args.length) return message.channel.send('> Usage: announce <#channel> <message> <+ping ?>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.channel.send('Please specify a channel!');

        if(!args[1]) return message.channel.send('Please specify a message to announce');


        channel.send(
            new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('RANDOM')
        )

        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }

    }
}