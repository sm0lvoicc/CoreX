const { Client, Message, Util } = require('discord.js');

module.exports = {
    name: 'steal-emoji',
    description: 'Steals emoji from a server.',
    usage: '<emoji>',
    timeout: 1000,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`');

        if(!args.length) return message.reply('Please specify some emojis.');

        for(const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);


            if(parsedEmoji.id) {
                const extension = parsedEmoji.animated ? '.gif' : '.png';
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Added: \`${rawEmoji}\``))
            }
        }
    }}