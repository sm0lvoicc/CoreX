const {Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pp',
    timeout: 1000,
    usage: '[@user]',
    description: 'Da PeePee machine does not lie',
    aliases: ['peepee', 'penis'],
    run: async(client, message, args) => {
        const { Client, Message, MessageEmbed } = require('discord.js')

        let user = message.mentions.users.first() || message.author;
        const number = Math.floor(Math.random() * 10);
		const pp = '=';

        if(user == message.author) {
            const ppembeduser = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Da PeePee machine')
            .setDescription('Your pp size is ' + '8' + (pp.repeat(number)) + 'D')
            .setFooter(`${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(ppembeduser)
        } else {
            const ppembed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Da PeePee machine`)
            .setDescription(`**${user.username}'s** pp size is ` + '8' + (pp.repeat(number)) + 'D')
            .setFooter(`${user.tag}`,
            user.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(ppembed2)
        }

    }
}
