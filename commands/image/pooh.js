const { Client, Message, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'pooh',
    description: 'Change the meaning of words using winnie the pooh meme',
    timeout: 5000,
    usage: '<text1> / <text2>',
    aliases: ['winnie'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

         const split = args.join(" ").split("/")
        const text1 = split[0];
        const text2 = split[1];
        if(!text1 || !text2) return message.reply("You need 2 sentences separated with `/` for this to work.")
   
        const Image = `https://api.popcatdev.repl.co/pooh?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`
        const poo = new MessageAttachment(Image, "tuxedopooh.png");
        message.channel.send(poo);

    }
}