const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-create',
    timeout: 20000,
    description: 'Creates custom command for the server.',
    primeOnly: true,
    aliases: ['custom-create'],
    usage: '<name> <response>',
    userPerms: ['ADMINISTRATOR'],
    clientPerms: ['ADMINISTRATOR'],
    run: async(client, message, args) => {

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name');
        if(!response) return message.channel.send('Please specify a response for the command');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('<:corexerror:860580531825147994> This custom commands exists already.');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`<:corexyes:860561725916053514> Saved \`${name}\` as a custom command!`);
    }
}