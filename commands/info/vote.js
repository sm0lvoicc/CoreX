const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    usage: '',
    timeout: 1000,
    description: 'Vote for the bot.',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    
    run: async(client, message, args) => {
        const b = new MessageEmbed()
		.setTitle('Please vote for the bot!')
		.setDescription('Vote for the bot in [Top.gg](https://top.gg/bot/819643325177921587/vote)')
        .setFooter('We will have vote rewards soon!')
		.setColor('RANDOM');
	message.channel.send(b);
    }
}