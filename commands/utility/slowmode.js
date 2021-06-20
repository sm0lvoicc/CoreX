const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    timeout: 1000 * 1,
    description: 'Sets the slowmode for the channel.',
    run: async(clietn, message, args) => {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You do not have the permission \`MANAGE_CHANNELS\`');


        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I do not have the permission \`MANAGE_CHANNELS\`')


        if(!args[0]) return message.reply('You need to specify a slowmode for the channel.');
        if(isNaN(args[0])) return message.reply('Please specify a number.');
        if(args[0] < 0) return message.reply('You must specify a positive number.');
        if(args[0] > 21600) return message.reply('Please specify a time less than or equal to 6 hours.');

        message.channel.setRateLimitPerUser(args[0]);

        var verify = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Channel slowmode has been set to \`${args[0]}\` seconds.`)
        .setTimestamp()
        message.channel.send(verify);
    }
}