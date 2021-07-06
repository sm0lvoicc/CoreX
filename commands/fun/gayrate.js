const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'gayrate', 
    timeout: 2000,
    description: 'Are you gay?',
    usage : '[@user]',
    aliases: ['gay', 'gae'],
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);

        if(user == message.author) {
            const gayEmbedUser = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Your gayrate')
            .setDescription(`You are **${rate}**% gay :rainbow_flag:`)
            .setFooter(`${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(gayEmbedUser)
        } else {
            const gayEmbed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${user.username}'s gayrate`)
            .setDescription(`${user} is **${rate}**% gay :rainbow_flag:`)
            .setFooter(`${user.tag}`,
            user.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(gayEmbed2)
        }

    }
}