const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'g-reroll',
    description: 'Re-roll an existing and running giveaway',
    timeout: 1000,
    usage: '<message-ID>',
    aliases: ['giv-reroll'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permission \`MANAGE_SERVER\`')
        
        if (!args[0]) return message.channel.send('Please provide a message ID to the giveaway!');
        let win;
        try {
            win = await Nuggies.giveaways.reroll(client, args[0]);
        }
        catch (e) {
            message.channel.send(`There has been an error, **${e}**`)
            message.channel.send('Unable to find the giveaway!');
        }
        if (!win[0]) return message.channel.send('There are not enough people in the giveaway!');
        message.channel.send(`Rerolled! <@${win}> is the new winner of the giveaway!`, { component: new MessageButton().setLabel('Giveaway').setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[0]}`).setStyle('url') });
    }
}
