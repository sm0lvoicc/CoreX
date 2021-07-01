const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge-links',
    description: 'Purge links from the channel',
    timeout: 3000,
    usage: '',
    aliases: ['purge-lk'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`')
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the permission \`MANAGE_MESSAGES\`')
    
        const channel = message;

        const amount = parseInt(args[0]);
        if (isNaN(amount) === true || !amount || amount < 0 || amount > 100) return message.reply('Please provide a message count between 1 and 100');

        let messages = (await message.channel.fetch({
            limit: amount, 
        })).filter(msg => msg.content.startsWith('http') || msg.content.startsWith('https') || msg.content.includes('https'))
        
        if(messages.size === 0) {
            message.channel.send(
                new MessageEmbed()
                .setTitle('Purge')
                .setDescription('There are no links in this channel')
                .setColor('RED')
                .setTimestamp()
            ).then(msg => msg.delete({ timeout: 5000 }))
        
        } else {
            channel.bulkDelete(messages, true)
            message.channel.send(
                new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`Deleted ${messages.size} message(s) containing links`)
                .setTimestamp()
            ).then(msg => msg.delete({ timeout: 5000 }))

        }
    } catch(e) {
        message.channel.send(`There has been an error, **${e}**`)

    }

    }

}