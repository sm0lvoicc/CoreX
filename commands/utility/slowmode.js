const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    timeout: 1000 * 1,
    description: 'Sets the slowmode for the channel.',
    userPerms: ['MANAGE_CHANNELS'],
    clientPerms: ['MANAGE_CHANNELS'],
    run: async(client, message, args) => {
        try {
        if(!args[0]) return message.channel.send('You need to specify a slowmode for the channel.');
        if(isNaN(args[0])) return message.channel.send('Please specify a number.');
        if(args[0] < 0) return message.channel.send('You must specify a positive number.');
        if(args[0] > 21600) return message.channel.send('Please specify a time less than or equal to 6 hours.');

        message.channel.setRateLimitPerUser(args[0]);

        var verify = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:corexyes:860561725916053514> Channel slowmode has been set to \`${args[0]}\` seconds.`)
        .setTimestamp()
        message.channel.send(verify);

        }catch(e) {
            message.channel.send(`There has been an error, **${e}**`)
        }
    }
}