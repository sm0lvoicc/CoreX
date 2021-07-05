const { Client, Message, MessageEmbed, MessageFlags } = require('discord.js');

module.exports = {
    name: 'avatar',
    descrption: 'Sends avatar of a user.',
    usage: '<user>',
    timeout: 1000,
    userPerms: [''],
    clientPerms: [''],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const avatarEmbed = new MessageEmbed()
        .setTitle(user.username)
        .setAuthor(user.tag, user.displayAvatarURL({ size: 64 }))
        .setImage(user.displayAvatarURL({ size: 2048, format: "png", dynamic: true }));
        message.channel.send(avatarEmbed)
    }
}