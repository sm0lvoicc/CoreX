const Meme = require("memer-api")
const memer = new Meme();
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'tweet',
    timeout: 20000,
    description: 'Sends a tweet comment with the provided text',
    usage: '<text>',
    aliases: ['biden'],
    userPerms: [''],
    clientPerms: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const sentence = args.join(" ")
        if (!sentence) return message.channel.send('Please specify a query.')
        let embed = new MessageEmbed()
          .setTitle('Joe Biden')
          .setImage(`https://api.popcatdev.repl.co/biden?text=${encodeURIComponent(sentence)}`)
          .setColor('BLURPLE')
          .setFooter(' ');
        message.channel.send(embed)
    }
}