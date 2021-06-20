const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge', 
    timeout: 1000 * 5,
    description: 'Clears messages,',
    run: async(client, message, args ) => {
        if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 100')
       
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`');


        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I do not have the permission \`MANAGE_MESSAGES\`')


        if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
       
        if(parseInt(args[0]) > 100) return message.channel.send('The max amount of messages that I can delete is 100')
        await message.channel.bulkDelete(parseInt(args[0]))
            .catch(err => console.log(err))
        message.channel.send(new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Deleted ' + args[0]  + " messages.")
        .setTimestamp()
        ).then(msg => msg.delete({ timeout: 5000 }))
    }
}