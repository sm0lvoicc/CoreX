const Discord = require("discord.js")
const Jumble = require('jumble-words');
const emoji = require('../../emoji.json')

module.exports = {
  name: 'jumble',
  description: 'Gives you a jumbled word, you have to unjumble it.',
  timeout: 1000,
  aliases: ['scramble'],
  userPerms: [''],
  clientPerms: [''],
  run: async(client, message, args) => {
    const jumble = new Jumble();
    const word = jumble.generate();
        const filter = m => m.author.id === message.author.id;

        await message.lineReply(`Your word is \`${word[0].jumble}\``);

        message.channel.awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 15000
        })
        .then(collected => {
            const m = collected.first();
            if (m.content.toLowerCase() != word[0].word.toLowerCase()) return message.LineReply(`Your choice is incorrect!. Correct word was \`${word[0].word}\``);
            return message.channel.send(`${emoji.success} Correct guess! The word was \`${word[0].word}\``);

        })
        .catch(() => {
            message.channel.send(`${emoji.error} You didn't answer in time. The correct word was \`${word[0].word}\``);


        })

    }
}