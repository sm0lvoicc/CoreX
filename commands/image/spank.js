const { Client, Message, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: 'spank',
    timeout: 20000,
    description: 'Spanks the mentioned person.',
    usage: '<@user>',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        if(!user) return message.reply('Breh, why you tryna spank yourself???')
        if(user === message.author) return message.reply('Breh, why you tryna spank yourself???')

        const avatar = user.displayAvatarURL({ format: "png" });
        const avatar2 = message.author.displayAvatarURL({ format: "png" })

        const image = await Canvas.spank(avatar2, avatar);

        message.channel.send(new MessageAttachment(image, "image.gif") )

    }
}