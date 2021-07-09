const { Client, Message, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: 'slap',
    timeout: 5000,
    description: 'Slaps mentioned person.',
    usage: '<@user>',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        if(!user) return message.channel.send('Who hurt you... why are you trying to slap yourself?')
        if(user === message.author) return message.channel.send('Who hurt you... why are you trying to slap yourself?')

        const avatar = user.displayAvatarURL({ format: "png" });
        const avatar2 = message.author.displayAvatarURL({ format: "png" })

        const image = await Canvas.slap(avatar2, avatar);

        message.channel.send(new MessageAttachment(image, "image.gif") )

    }
}