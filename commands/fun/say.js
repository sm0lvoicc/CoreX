module.exports = {
    name: 'say',
    description: 'Bot says what you typed.',
    usage: '<text>',
    timeout: 1000 * 3,
    run: async(client, message, args) => {
        const regex = /<@&(\d{17,19})>/g;
        const sayMessage = args.join(" ");
        if(sayMessage.has(regex)) return message.reply('I do not ping')


        if(!sayMessage) return message.reply('Please specify something to say')
        message.delete().catch(O_o=>{}); 
        message.channel.send(`${sayMessage}\n\nBy- **${message.author.tag}**`);
    }
}