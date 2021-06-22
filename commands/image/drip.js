const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'drip',
    description: 'Sheesh you got the drip',
    timeout: 5000,
    usage: '[@user]',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const img = `https://api.popcatdev.repl.co/drip?image=${user.displayAvatarURL({ dynamic: false, format: "png" })}`
        const attachment = new MessageAttachment(img, `Drip_${user.username}.jpg`);
        message.channel.send(attachment);
    }
}