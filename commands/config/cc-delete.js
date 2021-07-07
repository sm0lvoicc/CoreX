const schema = require('../../models/custom-commands');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'cc-delete',
    timeout: 20000,
    description: 'Deletes a specifed custom command from the server.',
    primeOnly: true,
    aliases: ['custom-delete'],
    usage: '<name>',
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['ADMINISTRATOR'],
    run: async(client, message, args) => {

        const name = args[0];

        if(!name) return message.channel.send('Please specify a command name');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send(`${emoji.error} That custom command does not exist!`);
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`${emoji.success} Removed **${name}** from custom commands!`);
    }
}