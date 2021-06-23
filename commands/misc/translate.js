const { Client, Message, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    description: 'Translates any text to English.',
    usage: '<lang> <text>',
    timeout: 1000,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        try{
        let language = args[0]
        if(!language){ return message.channel.send("Please enter a **language code**! Example `fr` / `de` / `en` etc")}

        const query = args.slice(1).join(" ")
        if(!query){ return message.channel.send(`Please enter a **text to translate**! Example: \`translate fr hello world\``)}

        const translated = await translate(query, { to: `${language}` })
        
        const translateEmbed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .addFields(
            { name: `Input`, value: `\`\`\`${query}\`\`\`` },
            { name: `Output`, value: `\`\`\`${translated.text}\`\`\``}
        )
        .setColor('GREEN')
        .setTimestamp()
        message.channel.send(translateEmbed)
        } catch(e) {
            message.channel.send(`There has been an error: **${e}**`)
        }
    }
}