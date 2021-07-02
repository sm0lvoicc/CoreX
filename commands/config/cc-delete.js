const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-delete',
    timeout: 20000,
    description: 'Deletes a specifed custom command from the server.',
    primeOnly: true,
    aliases: ['custom-delete'],
    usage: '<name>',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permisson \`ADMINISTRATOR\`');

        const name = args[0];

        if(!name) return message.channel.send('Please specify a command name');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('<:corexerror:860580531825147994> That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`<:corexyes:860561725916053514> Removed **${name}** from custom commands!`);
    }
}