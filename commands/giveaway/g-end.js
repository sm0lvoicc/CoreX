const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'g-end',
    description: 'End an exisitng giveaway',
    timeout: 2000,
    usage: '<message-id>',
    aliases: ['giv-end'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')

        if (!args[0]) return message.channel.send('Please provide a message ID of the giveaway to end!');
        try {
            const data = await Nuggies.giveaways.getByMessageID(args[0]);
            const msg = await client.guilds.cache.get(data.guildID).channels.cache.get(data.channelID).messages.fetch(args[0]);
            await Nuggies.giveaways.end(msg, data, msg);
        }
        catch (e) {
            message.channel.send(`There has been an error, **${e}**`)
            message.channel.send('Unable to find the giveaway!');
        }
    }
}