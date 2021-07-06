const { Client, Message, MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'server',
    description: 'Sends you support.',
    aliases: ['support-server'],
    timeout: 1000,
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {
        const supportEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
        .setTitle('Support has arrived!')
        .setDescription('Need help in a command? Have something to share? Or just wanna hangout then why not join the **support server** and share some ideas!')
        .addField(`Support Server`, `[Invite](${config.invite})`)
        .addField('Feel like inviting this bot?', '[Invite](https://dsc.gg/corex)')
        .addField('If you like me, you can vote for me!', '[Vote for me](https://top.gg/bot/819643325177921587/vote)')
        message.channel.send(supportEmbed)
    }
}