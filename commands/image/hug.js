const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'Hugs a user Awww!',
    timeout: 20000,
    usage: '<@user>',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        if(!user) return message.reply('Do me a favour, mention someone.');
        if(user.id === message.author.id) {
            return message.channel.send(`${message.author} is soo lonely\nhttps://tenor.com/view/sad-pablo-lonely-alone-gif-12928789`)
        }

        message.channel.send(`${message.author} hugged **${user.username}**, AWWW sooo cute!\nhttps://tenor.com/view/hug-friends-friends-forever-anime-cartoon-gif-4874598}`)
    }
}