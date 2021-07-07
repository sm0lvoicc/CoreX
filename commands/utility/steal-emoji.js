const { Client, Message, Util } = require('discord.js');
const emojis = require(`../../emoji.json`)

module.exports = {
    name: 'steal-emoji',
    description: 'Steals emoji from a server.',
    usage: '<emoji> <name>',
    timeout: 1000,
    userPerms: ['MANAGE_EMOJIS'],
    clientPerms: ['MANAGE_EMOJIS'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        try {
          
            const emoji = args[0];
            if (!emoji) return message.channel.send("Please provide emoji to add");
     
           let custom = Util.parseEmoji(emoji);
     
             const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
             if (!name) {
                 return message.channel.send("Please provide a name to set");
             }
             if (name.length < 2 || name > 32) {
                 return message.channel.send("Emoji name length should be between 2 and 32");
             }     
            const URL = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
        
          message.guild.emojis
                 .create(URL, name)
                 .then(emoji => {
                     message.channel.send(`${emojis.success} Emoji ${emoji} was successfully added`, {
                         emojiName: emoji.name
                     })
                 })
        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        } 
    }
}