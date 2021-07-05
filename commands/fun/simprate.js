const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'simprate',
    description: 'There is a simp amongus!',
    timeout: 2000,
    usage: '[@user]',
    aliases: ['simp', 'sr'],
    userPerms: [''],
    clientPerms: [''],
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);

        if(user == message.author) {
            const simpEmbedUser = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Your simprate')
            .setDescription(`You are **${rate}**% simp :heart_eyes:`)
            .setFooter(`${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(simpEmbedUser)
        } else {
            const simpEmbed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${user.username}'s simprate`)
            .setDescription(`${user} is **${rate}**% simp :heart_eyes:`)
            .setFooter(`${user.tag}`,
            user.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(simpEmbed2)
        }
    }
}