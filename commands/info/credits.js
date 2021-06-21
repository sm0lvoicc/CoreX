const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'credits',
    description: 'Shows all the amazing people that have helped make this bot.',
    timeout: 1000,
    aliases: ['creds'],
    run: async(client, message, args) => {
        const embedCredits = new MessageEmbed()
        .setColor('PURPLE')
        .addFields( 
            {
                name: 'You',
                value: 'Best person ever for helping make CoreX better and growing the bot!'
            },
            {
                name: 'Novà#1039',
                value: 'Core Developer of CoreX AKA the best person ever'
            }, 
            {
                name: 'Tagliatelle#2576',
                value: 'Core Developer of CoreX, got the idea of making CoreX, also join his [Server](https://discord.gg/cKUrkEtMkA) '
            },
            {
                name: 'Ultima#8878',
                value: 'A team member in CoreX, he has helped fix bugs and make CoreX better, also you can join his [Server](https://discord.gg/8qPDvefgHz)'
            },
            {
                name: 'TomTheManExplorer#6157',
                value: 'Amazing Team member who has helped grow CoreX and make it an amazing bot! Also join his [Server](https://discord.gg/cCp7yGzvBG)'
            }
        )
        .setFooter('We love you 💖')
        .setTimestamp()
        message.channel.send(embedCredits)
    }
}