const { Client, Message, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: 'invert',
    timeout: 5000,
    description: 'Inverts avatar.',
    usage: '[@user]',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const avatar = user.displayAvatarURL({ format: "png" });

        const image = await Canvas.invert(avatar);

        message.channel.send(new MessageAttachment(image, "image.gif") )

    }
}