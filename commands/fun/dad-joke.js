const {Client, Message, MessageEmbed } = require('discord.js');
const { getdadjoke } = require('get-dadjoke');

module.exports = {
    name: 'dad-joke',
    timeout: 5000, 
    aliases: ['dad'],
    description: 'Get a dad joke.',
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES'],
    run: async(client, message, args) => {

        const joke = await getdadjoke()
       
        message.channel.send(new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(joke)
        )
    }
}