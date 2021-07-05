const { Client, Message, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: 'beautiful',
    timeout: 20000,
    description: 'Sends and image of avatar being appreciated for its beauty.',
    usage: '[@user]',
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

        const avatar = user.displayAvatarURL({ format: "png" });

        const image = await Canvas.beautiful(avatar);

        message.channel.send(new MessageAttachment(image, "image.gif") )

    }
}