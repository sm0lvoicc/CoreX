const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge', 
    timeout: 1000 * 5,
    description: 'Clears messages,',
    run: async(client, message, args ) => {
        try {       
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have the permission \`MANAGE_MESSAGES\`');
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the permission \`MANAGE_MESSAGES\`')


        const amount = parseInt(args[0]);
        if (isNaN(amount) === true || !amount || amount < 0 || amount > 100)
          return message.reply('Please provide a message count between 1 and 100');

        await message.channel.bulkDelete(amount, true)
            .catch(err => console.log(err))
        message.channel.send(new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Deleted \`${amount}\` message(s)`)
        .setTimestamp()
        ).then(msg => msg.delete({ timeout: 5000 }))

        } catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}