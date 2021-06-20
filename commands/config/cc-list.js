const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    timeout: 20000,
    description: 'Shows a list of custom commands in the server.',
    primeOnly: true,
    aliases: ['custom-list'],
    usage: '',
    run: async(client, message, args) => {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send('There are no custom commands!');
        message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
    }
}